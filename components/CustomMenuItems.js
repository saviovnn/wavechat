import { Text, View } from "react-native";
import { MenuOption } from "react-native-popup-menu";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const MenuItem = ({ text, action, value, icon }) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View
        style={{
          height: 30,
          paddingHorizontal: 5,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {icon}
        <Text
          style={{ fontSize: hp(2), color: "rgb(82 82 82)" }}
          className="font-semibold"
        >
          {text}
        </Text>
      </View>
    </MenuOption>
  );
};
