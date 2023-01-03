import * as appInsights from 'applicationinsights';
import keyvault from 'configuration/keyvault.service';
import { IAzureUserSecrets } from 'domain/common/azure.secrets';

class ApplicationInsightService {

    public async init() {
        let secrets: IAzureUserSecrets = keyvault.data;
        appInsights
            .setup(secrets.applicationInsight.key)
            .setAutoDependencyCorrelation(true)
            .setAutoCollectRequests(true)
            .setAutoCollectPerformance(true, true)
            .setAutoCollectExceptions(true)
            .setAutoCollectDependencies(true)
            .setAutoCollectConsole(true, true)
            .setSendLiveMetrics(false)
            .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
            .start();
    }
}

const applicationInsight = new ApplicationInsightService();

export default applicationInsight;
