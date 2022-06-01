require('dotenv').config();
const { MongoClient } = require('mongodb');
const connectionString = process.env.URI;
const dbName = process.env.DATABASE;

const client = new MongoClient(connectionString);

// list of collections I need to be available
const collectionsRequired = ['valve', 'record', 'user'];

const valves = {
  record: {
    index: null,
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['for', 'date', 'calibration', 'recommendation'],
        properties: {
          for: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          date: {
            bsonType: 'date',
            description: 'must be a date and is required',
          },
          calibration: {
            bsonType: 'double',
            description: 'can only be double and is required',
          },
          recommendation: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
        },
      },
    },
  },
  valve: {
    index: [{ tag: 1 }, { unique: true }],
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'tag',
          'generalData',
          'operatingCondition',
          'protectedEquipment',
          'purchase',
        ],
        properties: {
          tag: {
            bsonType: 'string',
            description: 'string and is required',
          },
          generalData: {
            bsonType: 'object',
            properties: {
              inletLine: {
                bsonType: 'string',
                description: 'must be a string',
              },
              tag: {
                bsonType: 'string',
                description: 'string and is required',
              },
              outletLine: {
                bsonType: 'string',
                description: 'must be a string',
              },
              service: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
            },
          },
        },
      },
    },
  },
  user: {
    index: [{ email: 1 }, { unique: true }],
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'fName',
          'lName',
          'fullName',
          'password',
          'designation',
          'email',
        ],
        properties: {
          fName: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          lName: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          fullName: {
            bsonType: 'string',
            description: 'can only be string and is required',
          },
          password: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          designation: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          email: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          created: {
            bsonType: 'date',
            description: 'must be a date',
          },
        },
      },
    },
  },
};

/** Tries to connect to a mongodb database */
const connect = async () => {
  try {
    await client.connect();

    /** get the list of collections */
    const collectionsAvailable = await client
      .db(dbName)
      .listCollections()
      .toArray();

    // holds collections available in the db
    let dbCollections = [];

    for (collection of collectionsAvailable) {
      dbCollections.push(collection.name);
    }

    for (collection of collectionsRequired) {
      // create collection if it doesnt exist
      if (!dbCollections.includes(collection)) {
        client.db(dbName).createCollection(
          collection,
          (options = {
            validator: valves[collection].validator,
          })
        );
        // create an index if index isnt null in valves object
        if (valves[collection].index !== null) {
          client
            .db(dbName)
            .collection(collection)
            .createIndex(
              valves[collection].index[0],
              valves[collection].index[1]
            );
        }
      }
    }

    /** check to see which collections havent be created yet and then create them */

    console.log('Successfully connected to db');
  } catch (e) {
    console.log(e);
    console.log("Couldn't connect to database");
  }
};

connect();

module.exports = client;

/*
      $jsonSchema: {
        bsonType: 'object',
        required: ['tag'],
        properties: {
          tag: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          generalData: {
            bsonType: 'object',
            properties: {
              inletLine: {
                bsonType: 'string',
                description: 'must be a string',
              },
              outletLine: {
                bsonType: 'string',
                description: 'must be a string',
              },
              service: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
            },
          },
          protectedEquipment: {
            bsonType: 'object',
            properties: {
              tag: {
                bsonType: 'string',
                description: 'must be a string and is rerquired',
              },
              designPressure: {
                bsonType: 'double',
                description: 'must be a double and is required',
              },
              designTemperature: {
                bsonType: 'double',
                description: 'must be a double and is required',
              },
              valveLocation: {
                enum: ['top', 'side', null],
                description: 'must be a double and is required',
              },
            },
          },
          operatingCondition: {
            bsonType: 'object',
            properties: {
              setPressure: {
                bsonType: 'double',
                description: 'must be a double and is required',
              },
              reliefPressure: {
                bsonType: 'double',
                description: 'must be a double and is required',
              },
            },
          },
          purchase: {
            bsonType: 'object',
            properties: {
              manufacturer: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              serialNo: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              model: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
            },
          },
        },
      },
    }*/

/* valve: {
    index: [{ tag: 1 }, { unique: true }],
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'tag',
          'generalData',
          'protectedEquipment',
          'operatingCondition',
          'purchase',
        ],
        properties: {
          tag: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },

          inletLine: {
            bsonType: 'string',
            description: 'must be a string',
          },
          outletLine: {
            bsonType: 'string',
            description: 'must be a string',
          },
          service: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },

          properties: {
            protectedEqpTag: {
              bsonType: 'string',
              description: 'must be a string and is rerquired',
            },
            designPressure: {
              bsonType: 'double',
              description: 'must be a double and is required',
            },
            designTemperature: {
              bsonType: 'double',
              description: 'must be a double and is required',
            },
            valveLocation: {
              enum: ['top', 'side', null],
              description: 'must be a double and is required',
            },
          },

          properties: {
            setPressure: {
              bsonType: 'double',
              description: 'must be a double and is required',
            },
            reliefPressure: {
              bsonType: 'double',
              description: 'must be a double and is required',
            },
          },

          bsonType: 'object',
          properties: {
            manufacturer: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            serialNo: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            model: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
          },
        },
      },
    },
  },*/
