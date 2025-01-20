import React, { useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";

import { LineChart } from "react-native-chart-kit";

import {
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const [trandingDolar, setTrandingDolar] = useState(true);
  const [trandingEuro, setTrandingEuro] = useState(true);
  const [trandingYen, setTrandingYen] = useState(true);

  const [trandingBitcoin, setTrandingBitcoin] = useState(true);
  const [trandingEthereum, setTrandingEthereum] = useState(false);
  const [trandingDogecoin, setTrandingDogecoin] = useState(true);
  const [trandingLitecoin, setTrandingLitecoin] = useState(false);

  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : 0;

  const Data = [
    {
      id: 1,
      nome: "Bitcoin",
      iconName: "bitcoin",
      //fontawosome
      valorAtual: "R$ 612.160,61",
      trading: trandingBitcoin,
    },
    {
      id: 2,
      nome: "Ethereum",
      iconName: "ethereum",
      //fontawosome5
      valorAtual: "R$ 612.160,61",
      trading: trandingEthereum,
    },
    {
      id: 3,
      nome: "Dogecoin",
      iconName: "dogecoin",
      //MaterialCommunityIcons
      valorAtual: "R$ 612.160,61",
      trading: trandingDogecoin,
    },
    {
      id: 4,
      nome: "Litecoin",
      //fontawosome6
      iconName: "litecoin-sign",
      valorAtual: "R$ 612.160,61",
      trading: trandingLitecoin,
    },
  ];

  const DataMoedas = [
    {
      id: 1,
      nome: "Dólar",
      iconName: "dollar",
      valorAtual: "R$ 6,064",
      trading: trandingDolar,
    },
    {
      id: 2,
      nome: "Euro",
      iconName: "euro",
      valorAtual: "R$ 6,4580",
      trading: trandingEuro,
    },
    {
      id: 3,
      nome: "Yen",
      iconName: "yen",
      valorAtual: "R$ 0,0394",
      trading: trandingYen,
    },
  ];

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} color={"#5bd461"} />;
  } else {
    return (
      <SafeAreaView style={{ backgroundColor: "#1b1b1b", height: "100%" }}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <ScrollView>
          {/* <ImageBackground
              source={require("../assets/imgs/headerbackground.png")}
              resizeMode="cover"
              style={s.img}
              imageStyle={{ opacity: 0.3 }}
            /> */}

          <LinearGradient
            // Background Linear Gradient
            colors={["rgba(0,0,0,0.8)", "transparent"]}
            style={s.background}
          />
          <View style={[s.header, { paddingTop: statusBarHeight }]}>
            <View style={[s.line, { paddingHorizontal: 15 }]}>
              <Text style={[s.subititle, { fontSize: 25 }]}>
                Coinde<Text style={{ color: "yellow" }}>x</Text>
              </Text>

              <View style={[s.profileBackground]}>
                <FontAwesome5 name="question-circle" size={30} color="yellow" />
              </View>
            </View>

            <View style={s.card}>
              <View style={{ paddingVertical: 15 }}>
                <View style={[s.line, { padding: 0, width: "95%" }]}>
                  <Text
                    style={[s.subititle, { fontSize: 25, alignSelf: "flex-start" }]}
                  >
                    Dólar atual:
                  </Text>
                  <Text
                    style={[
                      s.subititle,
                      { fontSize: 25, alignSelf: "flex-start" },
                    ]}
                  >
                    R$6,024
                  </Text>
                </View>

                <View style={[s.line, { padding: 0, width: "95%" }]}>
                  <Text
                    style={[s.title, { fontSize: 17, alignSelf: "flex-start" }]}
                  >
                    Último mês:
                  </Text>
                  <Text
                    style={[
                      s.subititle,
                      { fontSize: 17, alignSelf: "flex-start" },
                    ]}
                  >
                    R$6,022
                  </Text>
                </View>

                <View style={[s.line, { padding: 0, width: "95%" }]}>
                  <Text
                    style={[s.title, { fontSize: 17, alignSelf: "flex-start" }]}
                  >
                    Último ano:
                  </Text>
                  <Text
                    style={[
                      s.subititle,
                      { fontSize: 17, alignSelf: "flex-start" },
                    ]}
                  >
                    R$4,024
                  </Text>
                </View>
              </View>


              <View style={{borderRadius: 10, overflow: 'hidden'}}>
              <LineChart
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                  datasets: [
                    {
                      data: [4, 5, 6, 6.024, 6.027, 6.024],
                    },
                  ],
                }}
                width={Dimensions.get("window").width}
                height={200}
                yAxisLabel="R$"
                yLabelsOffset={7}
                chartConfig={{
                  backgroundColor: "#1b1b1b",
                  backgroundGradientFrom: "#111111",
                  backgroundGradientTo: "#242424",
                  decimalPlaces: 2,
                  color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "5",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                }}
                bezier
                style={{
                  elevation: 20,
                }}
              />
              </View>


            </View>
          </View>

          <View style={[s.container]}>
            <Text
              style={[
                s.subititle,
                { alignSelf: "flex-start", marginHorizontal: 15 },
              ]}
            >
              Populares:
            </Text>

            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={Data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    height: 150,
                    width: 200,
                    margin: 10,
                    gap: 10,
                    padding: 15,
                    backgroundColor: "#171717",
                    borderRadius: 15,
                    elevation: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 15,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={[
                        s.profileBackground,
                        { borderWidth: 2, borderColor: "#1b1b1b" },
                      ]}
                    >
                      {item.iconName === "bitcoin" ? (
                        <FontAwesome name="bitcoin" size={24} color="yellow" />
                      ) : item.iconName === "ethereum" ? (
                        <FontAwesome5
                          name="ethereum"
                          size={24}
                          color="#42cbf5"
                        />
                      ) : item.iconName === "dogecoin" ? (
                        <MaterialCommunityIcons
                          name="dog"
                          size={24}
                          color="#f4f4f4"
                        />
                      ) : (
                        <FontAwesome6
                          name="litecoin-sign"
                          size={24}
                          color="#6b5fed"
                        />
                      )}
                    </View>
                    <Text style={s.subititle}>
                      {item.nome}{" "}
                      {item.trading ? (
                        <Feather name="trending-up" size={20} color="#5bd461" />
                      ) : (
                        <Feather name="trending-down" size={20} color="red" />
                      )}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column", gap: 5 }}>
                    <Text style={s.text}>
                      <Text style={s.subititle}>Atual: </Text>
                      {item.valorAtual}
                    </Text>
                    <Text style={s.text}>
                      <Text style={[s.subititle, { fontSize: 17 }]}>
                        Antes:{" "}
                      </Text>
                      {item.valorAtual}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>

          <View style={[s.container, { marginBottom: 15 }]}>
            <Text
              style={[
                s.subititle,
                { alignSelf: "flex-start", marginHorizontal: 15 },
              ]}
            >
              Moedas:
            </Text>

            <View style={{ alignItems: "center", padding: 10 }}>
              {DataMoedas.map((item) => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    height: 80,
                    width: "100%",
                    margin: 10,
                    gap: 10,
                    padding: 15,
                    backgroundColor: "#292929",
                    borderRadius: 15,
                    elevation: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 15,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={[
                        s.profileBackground,
                        { borderWidth: 2, borderColor: "#1b1b1b" },
                      ]}
                    >
                      {item.iconName === "dollar" ? (
                        <FontAwesome name="dollar" size={24} color="yellow" />
                      ) : item.iconName === "euro" ? (
                        <FontAwesome name="euro" size={24} color="#42cbf5" />
                      ) : (
                        <FontAwesome name="yen" size={24} color="#f4f4f4" />
                      )}
                    </View>
                    <Text style={s.subititle}>
                      {item.nome}{" "}
                      {item.trading ? (
                        <Feather name="trending-up" size={20} color="#5bd461" />
                      ) : (
                        <Feather name="trending-down" size={20} color="red" />
                      )}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    <Text style={[s.text, { color: "#c4c4c4" }]}>
                      {item.valorAtual}
                    </Text>
                    <Text style={[s.title, { fontSize: 19 }]}>
                      {item.valorAtual}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const s = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },

  card: {
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    height: 40,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "#1b1b1b",
    flexDirection: "row",
    gap: 5,
  },

  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 20,
    backgroundColor: "#141414",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },

  container: {
    minHeight: 150,
    maxHeight: 350,
    width: "100%",
    paddingVertical: 20,
  },

  line: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    paddingHorizontal: 5,
    width: "100%",
  },

  text: {
    fontSize: 16,
    color: "#f4f4f4",
    fontFamily: "Poppins_400Regular",
  },

  title: {
    fontSize: 22,
    color: "#f4f4f4",
    fontFamily: "Poppins_500Medium",
  },

  subititle: {
    fontSize: 20,
    color: "#f4f4f4",
    fontFamily: "Poppins_600SemiBold",
  },

  img: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  profileBackground: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
});
