import Chat from "../model/chat-model";
import User from "../../user/model/user-model";

exports.createNewChat = async (req, res) => {
  try {
    const chat = await new Chat({
      sender: req.body.sender,
      receiver: req.body.receiver,
      message: req.body.message,
      message_status: req.body.message_status,
    });

    chat.save();
    const user1 = await User.findById(req.body.sender);
    const user2 = await User.findById(req.body.receiver);
    let check1 = user1.contacts.includes(req.body.receiver);
    let check2 = user2.contacts.includes(req.body.sender);

    if (!check1) {
      // console.log("false and not included in the array");
      let oldContact1 = user1.contacts;
      oldContact1.push(req.body.receiver);
      const updation = await User.findByIdAndUpdate(
        req.body.sender,
        { contacts: oldContact1 },
        { new: true }
      );
    }
    if (!check2) {
      let oldContact = user2.contacts;
      oldContact.push(req.body.sender);
      const updation = await User.findByIdAndUpdate(
        req.body.receiver,
        { contacts: oldContact },
        { new: true }
      );
    }
    res.status(201).json({
      createdChat: chat,
    });
  } catch (error) {
    res.send(error.message);
  }
};

exports.showAllChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json({
      status: "success",
      no_of_chats: chats.length,
      chats: chats,
    });
  } catch (error) {
    res.send(error.message);
  }
};

exports.updateChatById = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      updatedChat: chat,
    });
  } catch (error) {
    res.send(error.message);
  }
};

// exports.lastChats = async(req, res)=>{
//     try {
//         const userOnChats = await Chat.find({ $or: [ {sender:req.body.user }, { receiver:req.body.user } ] })
//         if(userOnChats<0){
//             return res.status(404).json({
//                 message:"data not found"
//             })
//         }

//         userOnChats.forEach((element, index) => {
//             console.log(element)
//         });

//         res.status(200).json({
//             chat_count:userOnChats.length,
//             my_chats:userOnChats
//         })
//     } catch (error) {
//         res.send(error.message)
//     }
// }

exports.userHomeChatPage = async (req, res) => {
  try {
    const user = await User.findById(req.body.user);
    // console.log(user.contacts);
    const friendsId = user.contacts;
    let data = [];
    let emptyObj = {}
    // console.log(friendsId);
    for(let i = 0; i<friendsId.length; i++){
        const friendsDetail = friendsId[i]
        // console.log();
        const chats = await Chat.find(
            {
                $or: [ { sender : req.body.user, receiver: friendsDetail },
                     { sender:friendsDetail, receiver: req.body.user }
                ]
            })
        console.log(chats);
        const lastIndex = chats.length - 1;
        const finalChats = chats[lastIndex]
        // console.log(finalChats);

        if(finalChats.sender === req.body.user){
            let friend = await User.findById(finalChats.receiver)
            emptyObj.chat_id = finalChats._id
            emptyObj.name = friend.name
            emptyObj.profile_picture = friend.profile_picture
            emptyObj.message = finalChats.message
            data.push(emptyObj)
            // console.log(emptyObj);
        }
        if(finalChats.receiver === req.body.user){
            let friend = await User.findById(finalChats.sender)
            emptyObj.chat_id = finalChats._id
            emptyObj.name = friend.name
            emptyObj.profile_picture = friend.profile_picture
            emptyObj.message = finalChats.message
            data.push(emptyObj)
            // console.log(emptyObj);
        }
        if (data.length === friendsId.length){
            console.log("after the loop");
            // console.log(data);
        }
        // console.log(arr);
    }
  } catch (error) {
    res.send(error.message);
  }
};
