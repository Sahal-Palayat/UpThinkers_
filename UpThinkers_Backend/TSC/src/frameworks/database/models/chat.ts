const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    ChatName: { type: String, trim: true },
    Students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
        }
    ],
    LatestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message', 
    },
},
{
    timestamps: true
});

const ChatModel = mongoose.model('Chat', chatSchema);

export default ChatModel;
