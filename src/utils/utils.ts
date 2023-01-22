export const sendTelegramMessage = ({ message }: { message: string }) => {
  const token = process.env.REACT_APP_TOKEN;
  const chatID = process.env.REACT_APP_CHAT_ID;

  return fetch(
    `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${message}`,
    {
      method: "GET",
    }
  );
};
