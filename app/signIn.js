import { Fontisto, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../components/Loading";
import CustomKeyboardView from "../components/CustomKeyboardView";
import { useAuth } from "../context/authContext";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const ios = Platform.OS == "ios";

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Por favor preencha os campos!");
      return;
    }

    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);

    if (!response.success) {
      Alert.alert("Sign In", response.msg);
    }
    // preocesso de login
  };

  return (
    <CustomKeyboardView>
      <View className="flex-1">
        <StatusBar style="light" />
        <View style={{ backgroundColor: "#2661bd" }} className="flex-1">
          {/* signIn Image */}
          <View style={{ paddingBottom: hp(2) }} className="gap-4">
            <View style={{ paddingTop: hp(9), alignItems: "center" }}>
              <Image
                style={{ height: hp(26), width: wp(82) }}
                source={require("../assets/images/login.png")}
              />
            </View>

            <View className="gap-10">
              <Text
                style={{ fontSize: hp(4), color: "white" }}
                className="font-medium tracking-winder text-center"
              >
                Conecte-se
              </Text>
            </View>
          </View>
          {/* Inputs */}

          <View
            style={{
              backgroundColor: "white",
              borderTopEndRadius: 30,
              borderTopLeftRadius: 30,
              paddingTop: hp(8),
              paddingBottom: hp(10),
            }}
            className="items-center gap-4 "
          >
            {/* Email */}

            <View
              style={{ height: hp(7), width: wp(80) }}
              className="flex-row gap-4 px-4 bg-neutral-100  rounded-2xl items-center"
            >
              <Octicons name="mail" size={hp(4)} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700 "
                placeholder="Endereço de Email"
                placeholderTextColor={"gray"}
              />
            </View>

            {/* Senhas */}

            <View
              style={{ height: hp(7), width: wp(80) }}
              className="flex-row gap-6 px-4 bg-neutral-100 rounded-2xl items-center"
            >
              <Fontisto name="locked" size={hp(4)} color="gray" />
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700 "
                placeholder="Senha"
                placeholderTextColor={"gray"}
                secureTextEntry={true}
              />
            </View>

            <Text
              style={{ fontSize: hp(1.8), width: wp(80) }}
              className="font-xs text-right text-neutral-500"
            >
              Esqueceu a Senha?
            </Text>

            {/* Buttom */}

            <View>
              {loading ? (
                <View
                  style={{
                    height: hp(7),
                    width: wp(80),
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: "gray",
                  }}
                  className="justify-center bg-neutral-100  rounded-2xl"
                >
                  {ios ? (
                    <Loading size={hp(1)} />
                  ) : (
                    <ActivityIndicator size="large" color={"#2661bd"} />
                  )}
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleLogin}
                  style={{
                    height: hp(7),
                    width: wp(80),
                    alignItems: "center",
                    borderRadius: 10,
                    justifyContent: "center",
                    backgroundColor: "#2661bd",
                  }}
                >
                  <Text
                    style={{ fontSize: hp(2.7), color: "white" }}
                    className="font-bold tracking-winder"
                  >
                    Entre
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Sing Up Text */}

            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-xs text-center text-neutral-500"
              >
                Não possui conta?
              </Text>
              <Pressable onPress={() => router.push("signUp")}>
                <Text style={{ color: "#2661bd", fontSize: hp(1.8) }}>
                  {" "}
                  Cadastre-se
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
