const inappropriateContent = ['يلعن','جحش','ابوك','حمار','حيوان','كلب']; // add more explicit words to this array

const kickOutUser = (userId) => {
  // code to kick out user goes here
  // for example, you can send a message to the user and then unsubscribe them from further messages
  messenger.send(`لقد تم طردك لإرسال محتوى غير لائق.`, userId)
  if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage('اعطيني ادمن', event.threadID, event.messageID);
    .then(() => messenger.unsubscribe(userId))
    .catch((error) => console.error(`Error kicking out user ${userId}:`, error));
}

messenger.on('message', (message) => {
  const messageText = message.text.toLowerCase();
  inappropriateContent.forEach((word) => {
    if (messageText.includes(word)) {
      kickOutUser(message.sender.id);
    }
  });
});