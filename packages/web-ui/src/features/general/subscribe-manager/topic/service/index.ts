import { MQTTBrokerAdminServiceClient } from "@mbpb/AdminServiceClientPb";
import * as adminApi from "@mbpb/admin_pb";
import { SERVER_CONFIG } from "@/config/server";

const service = new MQTTBrokerAdminServiceClient(
  SERVER_CONFIG.MQTT_SERVER,
  null,
  null,
);

export const fetchTopicList = async (): Promise<
  adminApi.ListTopicReply.AsObject["topicsList"]
> => {
  return new Promise((s, j) => {
    let req = new adminApi.ListTopicRequest();
    // just test code
    req.setTopicName("test/topic1");
    service.mqtt_broker_list_topic(req, null, (err, response) => {
      if (err) {
        j(err);
      } else {
        const ret = response.toObject();
        s(ret.topicsList);
      }
    });
  });
};
