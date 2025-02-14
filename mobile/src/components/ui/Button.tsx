import { View, Text, TouchableOpacity } from "react-native";

export default function Button({
  title,
  onPress,
  disabled,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      className={` w-full p-5 rounded-full ${
        disabled ? "bg-[#B4B4B4]" : "bg-[#0000B9]"
      }`}
    >
      <Text
        className={`${
          disabled ? "text-[#8F8F8F]" : "text-white"
        } text-2xl font-AlexandriaRegular text-center`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
