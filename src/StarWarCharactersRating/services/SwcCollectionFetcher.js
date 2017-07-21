import SwcSingleDataFetcher from './SwcSingleDataFetcher';

//Fetch all people by default
const DEFAULT_URL = 'http://swapi.co/api/people/';

const cache = new Map();

class SwcCollectionFetcher {

    /**
     * fetch all data for certain type of source(e.g. for all people) according to the given API by checking whether the next property is null or not.
     * @param url the start URL for page 1.
     * @param additionalData the data to be added to original data.
     * @param onProgress the listener function would get called when one page is loaded.
     * @returns promise when all pages/data loaded.
     */
    static async fetchAllData(url = DEFAULT_URL, additionalData, onProgress) {
        if(cache.has(url)) {
            return cache.get(url);
        }
        const collection = new Map();
        let data = await fetchData(collection, url);
        while(data && data.next) {
            data = await fetchData(collection, data.next);
        }

        cache.set(url, collection);
        return collection;

        async function fetchData(collection, url) {
            let data = await SwcSingleDataFetcher.fetch(url);
            data.results.forEach(result => collection.set(result.url, Object.assign({}, result, additionalData)));
            if(onProgress) {
                onProgress(collection);
            }
            return data;
        }
    }
}

export default SwcCollectionFetcher;