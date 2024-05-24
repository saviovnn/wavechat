import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../utils/common";
import { Image } from "expo-image";

export function ChatItem({ item, router }) {
  const { user } = useAuth();

  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
  };
  return (
    <TouchableOpacity
      onPress={openChatRoom}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 5,
        marginBottom: 10,
        gap: 3,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: "rgb(229 229 229)",
      }}
    >
      {/* Foto de Perfil do Usuario */}

      <Image
        style={{
          height: hp(7),
          width: hp(7),
          aspectRatio: 1,
          borderRadius: 100,
        }}
        source={{ uri: item?.profileUrl }}
        placeholder={blurhash}
        transition={500}
      />

      {/* Nome e Ultima Mensagem  */}

      <View className="flex-1 ">
        <View className="flex-row" style={{ justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: hp(2.5),
              paddingLeft: 5,
            }}
            className="font-medium text-neutral-800"
          >
            {item?.username}
          </Text>

          <Text
            style={{
              fontSize: hp(2),
              marginRight: 5,
            }}
            className="font-medium text-neutral-500"
          >
            Time
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(2.2), paddingLeft: 5 }}
          className="font-medium text-neutral-500"
        >
          Mensagem do dia
        </Text>
      </View>
    </TouchableOpacity>
  );
}
