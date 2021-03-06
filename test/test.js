var P2PTV = require('../src/server/p2ptv.js'),
    Network = require('../src/server/network.js'),
    Gateway = require('../src/server/gateway.js'),
    Peer = require('../src/server/peer.js'),
    PushPullWindow = require('../src/server/push-pull-window.js'),
    Encoder = require('../src/server/encoder.js'),
    assert = require('assert');

// ../src/server/p2ptv.js tests
describe('p2ptv', function() {
  describe('P2PTV', function() {
    it('should throw for invalid network type', function() {
      assert.throws(function() {
        new P2PTV({network: 1235235});
      }, /Network type/);
    });
    it('should throw for invalid signaling port', function() {
      assert.throws(function() {
        new P2PTV({signaling: -1});
      }, /Signaling port/);
    });
    it('should throw for invalid upstream port', function() {
      assert.throws(function() {
        new P2PTV({upstream: 999});
      }, /Upstream port/);
    });
    it('should throw for invalid bitrate', function() {
      assert.throws(function() {
        new P2PTV({bitrate: '480p'});
      }, /Bitrate/);
    });
    it('should throw for invalid durations', function() {
      assert.throws(function() {
      new P2PTV({durations: 'what?'});
      }, /durations/);
    });
  });
});

// ../src/server/network.js tests
describe('network', function() {
  describe('Network', function() {
    it('should throw for invalid network type', function() {
      assert.throws(function() {
        new Network('mtreebone');
      }, /Invalid network/);
    });
  });
});

// ../src/server/gateway.js tests
describe('gateway', function() {
  describe('Gateway', function() {
    it('should throw for invalid id', function() {
      assert.throws(function() {
        new Gateway({id: 1902309});
      }, /string as id/);
    });
    it('should throw for invalid upstream port', function() {
      assert.throws(function() {
        new Gateway({id: 'bogusid', port: 999});
      }, /port number/);
    });
    it('should throw for invalid bitrate', function() {
      assert.throws(function() {
        new Gateway({id: 'bogusid', bitrate: -1});
      }, /bitrate greater than 0/);
    });
    it('should throw for invalid durations', function() {
      assert.throws(function() {
        new Gateway({id: 'bogusid', durations: 'what?'});
      }, /durations/);
    });
  });
});

// ../src/server/peer.js tests
describe('peer', function() {
  describe('Peer', function() {
    it('should throw for invalid id', function() {
      assert.throws(function() {
        new Peer(1902309);
      }, /id of type string/);
    });
    it('should throw for invalid WebSocket Object', function() {
      assert.throws(function() {
        new Peer('bogusid');
      }, /valid WebSocket/);
    });
  });
});


// ../src/server/push-pull-window.js tests
describe('push-pull-window', function() {
  describe('PushPullWindow', function() {
    describe('#_pushInitSegment', function() {
/*
      it('should emit initialization segment', function() {
        // TODO
      });

      it('should emit x media segment chunks', function() {
        // TODO
      }
*/
      it('should throw for a too large of an initialization segment', function() {
        var pushPullWindow = new PushPullWindow({bitrate: 300});
        var buffer = new Buffer(pushPullWindow._encoder._maxInitSegPayload + 1);
        assert.throws(function() {
          pushPullWindow._pushInitSegment(buffer);
        }, /too large/);
      });

    });
  });
});

// ../src/server/encoder.js tests
describe('encoder', function() {
  describe('Encoder', function() {

    describe('#getEmptyChunkMessage', function() {
      it('should throw for payload size greater than maximum chunk payload', function() {
        var encoder = new Encoder();
        assert.throws(function() {
          encoder.getEmptyChunkMessage({timecode: 0, payloadSize: encoder._maxChunkPayload + 1});
        }, /payload size greater than/);
      });
    });

    describe('#getEmptyInitSegMessage', function() {
      it('should throw for payload size greater than maximum initialization segment payload', function() {
        var encoder = new Encoder();
        assert.throws(function() {
          encoder.getEmptyInitSegMessage({timecode: 0, payloadSize: encoder._maxInitSegPayload + 1});
        }, /payload size greater than/);
      });
    });

  });
});
