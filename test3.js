const inappropriateContent = ['كلب']; // add more explicit words to this array

const kickOutUser = (userId) => {
  // code to kick out user goes here
  // for example, you can send a message to the user and then unsubscribe them from further messages
  messenger.send(`تم طرد هذا العضو لاستخدانه كلمات غير اخلاقية وليست مسموحة هنا اذا كان احد يظن انني اخطأت بطرده راجع مسؤولين المجموعة...تحت رعاية(Mohammed Ps)`, userId)
    .then(() => messenger.unsubscribe(userId))
    .catch((error) => console.error(`Error kicking out user ${userId}:`, error));
  if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage('اريد ان اكون ادمن حتى يتم تصفية الانذال🔪🤝', event.threadID, event.messageID);
}

messenger.on('message', (message) => {
  const messageText = message.text.toLowerCase();
  inappropriateContent.forEach((word) => {
    if (messageText.includes(word)) {
      kickOutUser(message.sender.id);
    }
  });
});