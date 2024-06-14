import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  Pressable,
  StatusBar,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useAuth } from "../../context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatList from "../../components/ChatList";
import Loading from "../../components/Loading";
import { getDocs, query, where } from "firebase/firestore";
import { usersRef } from "../../firebaseConfig";

export default function Home() {
  const ios = Platform.OS == "ios";

  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, []);
  const getUsers = async () => {
    const q = query(usersRef, where("userId", "!=", user?.uid));

    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });
    setUsers(data);
  };
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {users.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <View style={{ height: hp(10) }}>
            {ios ? (
              <Loading size={hp(1)} />
            ) : (
              <ActivityIndicator size="large" color={"#2661bd"} />
            )}
          </View>
        </View>
      )}
    </View>
  );
}
