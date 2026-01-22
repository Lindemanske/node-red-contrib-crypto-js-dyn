module.exports = function (RED) {
	var CryptoJS = require("crypto-js");

	function DigestNode(config) {
		RED.nodes.createNode(this, config);

		var node = this;
		node.algorithm = config.algorithm;
		node.key = config.key;

/*		node.on('input', function (msg) {
			// check configurations
			if(!node.algorithm || !node.key) {
				// rising misconfiguration error
				node.error("Missing configuration, please check your algorithm or key.", msg);
			} else {
				// check the payload
				if(msg.payload) {
					// debugging message
					node.debug('Creating a digest of payload using '+node.algorithm);
					// digest with CryptoJS
					msg.payload = CryptoJS[node.algorithm](msg.payload, node.key).toString();
				} else {
					// debugging message
					node.trace('Nothing to digest: empty payload');
				}

				node.send(msg);
			}
		});*/
		node.on('input', function (msg) {
    		// Gebruik de sleutel uit de msg, of anders de sleutel uit de config
    		var finalKey = msg.secretkey || node.key;

    		if(!node.algorithm || !finalKey) {
        		node.error("Missing configuration: algorithm or key.", msg);
    		} else {
        		if(msg.payload) {
					// debugging message
					node.debug('Creating a digest of payload using '+node.algorithm);
            		// digest with CryptoJS
            		msg.payload = CryptoJS[node.algorithm](msg.payload, finalKey).toString();
        		} else {
					// debugging message
					node.trace('Nothing to digest: empty payload');
				}
        		node.send(msg);
    		}
		});
	}

	RED.nodes.registerType("hmac", DigestNode);
};
