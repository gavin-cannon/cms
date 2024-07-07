var Sequence = require('../models/sequence');


// Document.find()
//     .populate('children')
//     .then(documents => {
//         console.log(documents);
//         res.status(200).json(

//             documents
//         );
//     })
//     .catch(error => {
//         res.status(500).json({
//             message: 'An error occured!',
//             error: error
//         });
//     });

let sequenceId;
let maxDocumentId;
let maxMessageId;
let maxContactId;
class SequenceGenerator {

    constructor() {
        // const sequence = Sequence.find()
        //     .then(sequences => {
        //         console.log(sequences);
        //         return sequences
        //     }).catch(error => {
        //         res.status(500).json({
        //             message: 'An error occured!',
        //             error: error
        //         });
        //     }).then(
        //         function(result) {
        //             console.log('resulte:', result);
        //             return result;
        //         }
        //     );

        const sequence = this.getSequence()
            .then(
                function(result) {
                    console.log('resulte:', result);
                    sequenceId = result._id;
                    maxDocumentId = result.maxDocumentId;
                    maxContactId = result.maxContactId;
                    maxMessageId = result.maxMessageId;

                    return result;
                }
            );
        console.log('this is the sequence', sequence);


    }

    async getSequence() {
        return await Sequence.findOne().exec();
    }

}

SequenceGenerator.prototype.nextId = function(collectionType) {

    var updateObject = {};
    var nextId;
    switch (collectionType) {
        case 'documents':
            maxDocumentId++;
            updateObject = { maxDocumentId: maxDocumentId };
            nextId = maxDocumentId;
            break;
        case 'messages':
            maxMessageId++;
            updateObject = { maxMessageId: maxMessageId };
            nextId = maxMessageId;
            break;
        case 'contacts':
            maxContactId++;
            updateObject = { maxContactId: maxContactId };
            nextId = maxContactId;
            break;
        default:
            return -1;
    }
    console.log(SequenceGenerator.seqId);
    Sequence.updateMany({ _id: sequenceId }, { $set: updateObject })
        .then(function(err) {
            if (err) {
                console.log("nextId error = " + err);
                return null
            }
        });

    return nextId;

}

// async function initializeSequence(req, res) {
//     try {
//         const sequence = await Sequence.findOne().exec();

//         if (!sequence) {
//             return res.status(404).json({
//                 title: 'Sequence not found',
//                 error: 'No sequence document found'
//             });
//         }

//         sequenceId = sequence._id;
//         maxDocumentId = sequence.maxDocumentId;
//         maxMessageId = sequence.maxMessageId;
//         maxContactId = sequence.maxContactId;

//     } catch (err) {
//         return res.status(500).json({
//             title: 'An error occurred',
//             error: err
//         });
//     }
// }



// async function nextId(collectionType) {
//     let updateObject = {};
//     let nextId;

//     switch (collectionType) {
//         case 'documents':
//             maxDocumentId++;
//             updateObject = { maxDocumentId: maxDocumentId };
//             nextId = maxDocumentId;
//             break;
//         case 'messages':
//             maxMessageId++;
//             updateObject = { maxMessageId: maxMessageId };
//             nextId = maxMessageId;
//             break;
//         case 'contacts':
//             maxContactId++;
//             updateObject = { maxContactId: maxContactId };
//             nextId = maxContactId;
//             break;
//         default:
//             return -1;
//     }

//     try {
//         await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject }).exec();
//     } catch (err) {
//         console.error("nextId error = " + err);
//         return null;
//     }

//     return nextId;
// }


module.exports = new SequenceGenerator();

// module.exports = {
//     initializeSequence,
//     nextId
// };