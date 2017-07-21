import Promise from 'bluebird';
import xhr from 'xhr';

const REQUEST_TIMEOUT = 10000;
const HTTP_OK = 200;
const promisifiedGet = Promise.promisify(xhr.get);

//cache all loaded data with key of its URL.
const cache = new Map();

class SwcSingleDataFetcher {

    /**
     * Fetch data by the given URL
     * @param url the data URL
     * @param timeout
     * @returns a promise when the data is loaded.
     */
    static fetch(url, timeout = REQUEST_TIMEOUT) {
        if (cache.has(url) && !cache.get(url).isRejected()) {
            return cache.get(url);
        }

        const fetcher = promisifiedGet({
            url,
            timeout,
            responseType: 'json'
        })
            .then(resp => {
                if (resp.statusCode === HTTP_OK) {
                    return resp.body;
                }
                return Promise.reject(new Error(resp.statusCode));
            })
            .catch(failureMsg => {
                return Promise.reject(new Error(`File request failed with message: ${failureMsg.message}`));
            });
        cache.set(url, fetcher);
        return fetcher;
    }
}

export default SwcSingleDataFetcher