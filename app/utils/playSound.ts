import { Audio } from "expo-av";
import { soundMap } from "../../assets/sounds/soundMap";

const playSound = async (id: number | undefined) => {
  if (!id || !soundMap[id]) return;

  const { sound } = await Audio.Sound.createAsync(soundMap[id]);
  await sound.playAsync();
};

export default playSound;
