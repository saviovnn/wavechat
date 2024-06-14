import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash, formatDate, getRoomId } from "../utils/common";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export function ChatItem({ item, router, currentUser }) {
  const [lastMessage, setLastMessage] = useState(undefined);
  useEffect(() => {
    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });
    return unsub;
  }, []);

  // console.log("Ultima msg: ", lastMessage);

  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
  };

  const renderTime = () => {
    if (lastMessage) {
      let date = lastMessage?.createdAt;
      return formatDate(new Date(date?.seconds * 1000));
    }
  };

  const renderLastMessage = () => {
    if (typeof lastMessage === "undefined") return "Carregando...";
    if (lastMessage) {
      if (currentUser?.userId === lastMessage.userId)
        return "Você: " + lastMessage?.text;
      return lastMessage?.text;
    } else {
      return "Mande um Oi! 👋 ";
    }
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
            {renderTime()}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(2.2), paddingLeft: 5 }}
          className="font-medium text-neutral-500"
        >
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
