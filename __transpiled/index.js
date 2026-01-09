'use strict';

require('source-map-support/register');
var generatorReactSdk = require('@asyncapi/generator-react-sdk');
var jsxRuntime = require('C:/Users/harsh/AppData/Roaming/npm/node_modules/@asyncapi/cli/node_modules/@asyncapi/generator/node_modules/react/cjs/react-jsx-runtime.production.min.js');

function index ({
  asyncapi,
  params
}) {
  return /*#__PURE__*/jsxRuntime.jsx(generatorReactSdk.File, {
    name: "client.py",
    children: `import paho.mqtt.client as mqtt
mqttBroker = "${asyncapi.servers().get(params.server).host()}"

class TemperatureServiceClient:
    def __init__(self):
      
        self.client = mqtt.Client()      
        self.client.connect(mqttBroker)


    def sendTemperatureChange(self, id):
      
        topic = "temperature/changed"
        self.client.publish(topic, id)`
  });
}

module.exports = index;
//# sourceMappingURL=index.js.map
