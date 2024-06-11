import { useLocalSearchParams, useRouter } from "expo-router";
import React, { Component, useEffect, useState } from "react";
import {
  Alert,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "../../context/authContext";
import { blurhash, getRoomId } from "../../utils/common";
import {
  AntDesign,
  Feather,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useRef } from "react";
import MessageList from "../../components/MessagesList";

const ios = Platform.OS == "ios";

export default function ChatRoom() {
  const item = useLocalSearchParams(); // segundo user
  const { user } = useAuth(); // usuario logado
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const [messages, setMessages] = useState([]);
  const textRef = useRef("");
  const inputRef = useRef(null);

  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => (doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });
    return unsub;
  }, []);

  const createRoomIfNotExists = async () => {
    // Id room
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef) inputRef?.current.clear();

      const newDoc = await addDoc(messagesRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });

      console.log("id da nova menssagem: ", newDoc.id);
    } catch (error) {
      Alert.alert("Message", error.message);
    }
  };

  return (
    <CustomKeyboardView inChat={true}>
      <View className="flex-1" style={{ backgroundColor: "#f0f0f0" }}>
        <StatusBar style="light" />

        {/* Chat Header */}
        <View
          style={{
            backgroundColor: "#2661bd",
            paddingTop: ios ? top + 5 : top + 10,
            borderBottomEndRadius: 20,
            borderBottomLeftRadius: 20,
            paddingBottom: 10,
            paddingHorizontal: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            shadowColor: "#171717",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4.59,
            elevation: 5,
            boxWithShadow: {
              elevation: 500,
            },
          }}
        >
          {/* Botao para voltar para a lista de usuarios */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <AntDesign name="arrowleft" size={hp(5)} color="white" />
          </TouchableOpacity>

          {/* Foto de perfil do usuario selecionado */}

          <Image
            style={{
              height: hp(6),
              width: hp(6),
              aspectRatio: 1,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
            source={{ uri: item?.profileUrl }}
            placeholder={blurhash}
            transition={500}
          />

          {/* Nome do usuario selecionado */}

          <Text
            style={{
              fontSize: hp(4.5),
              color: "white",
              alignItems: "center",
              fontWeight: "normal",
              justifyContent: "center",
            }}
            className="font-medium text-neutral-800"
          >
            {item?.username}
          </Text>

          {/* Icon de chamada de video */}

          <TouchableOpacity
            onPress={() => ""}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons name="videocam-outline" size={hp(5)} color="white" />
          </TouchableOpacity>

          {/* Icon de ligacao */}

          <TouchableOpacity
            onPress={() => ""}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <SimpleLineIcons name="phone" size={hp(4)} color="white" />
          </TouchableOpacity>
        </View>

        <ChatRoomHeader user={item} router={router} />

        {/* Input de Menssagens */}
        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
          <View className="flex-1">
            <MessageList messages={messages} />
          </View>
          <View
            style={{ marginBottom: hp(1.7), paddingTop: 2 }}
            className="pt-2"
          >
            <View className="flex-row mx-3 justify-between bg-white p-2 border-neutral-300 rounded-full pl-5">
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholder="Escreva sue menssagem..."
                placeholderTextColor={"#737373"}
                style={{ fontSize: hp(2) }}
                className="flex-1 mr-2"
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#dfdfdf",
                  borderRadius: 100,
                  padding: 5,
                  margin: 1,
                }}
                className="bg-neutral-600 p-2 mr-[1px] rounded-full"
              >
                <Feather name="send" size={hp(3)} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
