import { redirect, useNavigate } from "react-router";
import RoundedButton from "../../components/shared/RoundedButton/RoundedButton";

type props = {
  uid: string;
};

export default function GameLink({ uid }: props) {
  const siteUrl = window.location.origin
  const navigate = useNavigate();
  const url = `${siteUrl}/match/${uid}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex flex-col gap-3">
      <h5>Ссылка на игру: </h5>
      <h5 className="truncate">{url}</h5>
      <div className="flex gap-3 flex-wrap">
        <RoundedButton onClick={() => navigate(`/match/${uid}`)}>
          Перейти
        </RoundedButton>
        <RoundedButton onClick={copyLink}>Скопировать</RoundedButton>
      </div>
    </div>
  );
}
