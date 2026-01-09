
import { File } from '@asyncapi/generator-react-sdk'


export default function ({ asyncapi, params }) {

  return <File name="client.py">{
    `import paho.mqtt.client as mqtt
mqttBroker = "${asyncapi.servers().get(params.server).host()}"

class TemperatureServiceClient:
    def __init__(self):
      
        self.client = mqtt.Client()      
        self.client.connect(mqttBroker)


    def sendTemperatureChange(self, id):
      
        topic = "temperature/changed"
        self.client.publish(topic, id)`
  }</File>
}