import http from './services/httpService.js';

const apiEndPoint = 'http://www.apilayer.net/api/live?access_key=40ce77a55226530cdfae7fe951a6711a&format=1';
let AnalyticsData = null;
let records = null;
let CUR = 'AUD';
const Analytics = {
    getCurrencies: 'AUD',
    getAnalyticData: (getCurrencies) =>  {
        return AnalyticsData;
    },
    init: (getCurrencies) => {
        AnalyticsData = {
            data: Analytics.getData(getCurrencies)
        }
    },
    async getData(getCurrencies) {
        const promise = http.get(apiEndPoint+'&currencies=');
        const response = await promise;
        return response.data.quotes;
    },
    getAnalytic(getCurrencies) { 
        return AnalyticsData.data;
    }
} 

export default Analytics;