import { FontAwesome, Fontisto, Octicons } from "@expo/vector-icons";
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

export default function SingUp() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const ios = Platform.OS == "ios";

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const profileRef = useRef();

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !profileRef.current ||
      !usernameRef.current
    ) {
      Alert.alert("Sign Up", "Por favor preencha os campos!");
      return;
    }

    setLoading(true);
    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    );
    setLoading(false);

    console.log("obteve resultado", response);
    if (!response.success) {
      Alert.alert("Cadastre-se", response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <View className="flex-1">
        <StatusBar style="light" />
        <View style={{ backgroundColor: "#2661bd" }} className="flex-1">
          {/* signUp Image */}
          <View style={{ paddingBottom: hp(2) }} className="gap-4">
            <View style={{ paddingTop: hp(9), alignItems: "center" }}>
              <Image
                style={{
                  height: hp(21),
                  width: wp(41),
                }}
                source={require("../assets/images/register.png")}
              />
            </View>

            <View className="gap-10">
              <Text
                style={{ fontSize: hp(4), color: "white" }}
                className="font-medium tracking-winder text-center"
              >
                Cadastre-se
              </Text>
            </View>
          </View>
          {/* Inputs */}

          <View
            style={{
              backgroundColor: "white",
              borderTopEndRadius: 30,
              borderTopLeftRadius: 30,
              paddingTop: hp(4),
              paddingBottom: hp(10),
            }}
            className="items-center gap-4 "
          >
            {/* Nome de Usuario */}

            <View
              style={{ height: hp(7), width: wp(80) }}
              className="flex-row gap-4 px-4 bg-neutral-100 rounded-2xl items-center"
            >
              <FontAwesome name="user-circle" size={hp(4)} color="gray" />
              <TextInput
                onChangeText={(value) => (usernameRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700 "
                placeholder="Nome de Usuario"
                placeholderTextColor={"gray"}
              />
            </View>

            {/* Email*/}

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

            {/* Senha */}

            <View
              style={{ height: hp(7), width: wp(80) }}
              className="flex-row gap-6 px-4 bg-neutral-100  rounded-2xl items-center"
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

            {/* Url Foto */}

            <View
              style={{ height: hp(7), width: wp(80) }}
              className="flex-row gap-4 px-4 bg-neutral-100  rounded-2xl items-center"
            >
              <FontAwesome name="picture-o" size={hp(4)} color="gray" />
              <TextInput
                onChangeText={(value) => (profileRef.current = value)}
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700 "
                placeholder="Url para Foto de Perfil"
                placeholderTextColor={"gray"}
              />
            </View>

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
                  onPress={handleRegister}
                  style={{
                    backgroundColor: "#2661bd",
                    height: hp(6.5),
                    width: wp(80),
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: hp(2.7), color: "white" }}
                    className="font-bold tracking-winder"
                  >
                    Cadastre-se
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
                Já possui uma conta?
              </Text>
              <Pressable onPress={() => router.push("signIn")}>
                <Text style={{ color: "#2661bd", fontSize: hp(1.8) }}>
                  {" "}
                  Conecte-se
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
