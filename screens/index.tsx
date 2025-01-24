//Feito por Vinicius Eduardo, 2025
//
//GitHub: Vinidevkz
//Instagram: vinidevkz
//

import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
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

import Modal from "react-native-modal";

import { senhaApi } from "../src/services/apidoc";

import {
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { parse } from "@babel/core";

export default function Home() {

  const [trandingBitcoin, setTrandingBitcoin] = useState(true);
  const [trandingEthereum, setTrandingEthereum] = useState(false);
  const [trandingDogecoin, setTrandingDogecoin] = useState(true);
  const [trandingLitecoin, setTrandingLitecoin] = useState(false);

  const [valores, setValores] = useState<ValoresAPI | null>(null);
  const [valoresGraf, setValoresGraf] = useState<ValorGrafico[] | null>(null);

  const [grafBitcoin, setGrafBitcoin] = useState<ValorGrafico[] | null>(null);
  const [grafEthereum, setGrafEthereum] = useState<ValorGrafico[] | null>(null);
  const [grafDogecoin, setGrafDogecoin] = useState<ValorGrafico[] | null>(null);
  const [grafLitecoin, setGrafLitecoin] = useState<ValorGrafico[] | null>(null);

  const ultimoValor = useRef(null)
  const [icon, setIcon] = useState<"trending-up" | "trending-down">("trending-down")
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectGraf, setSelectGraf] = useState<keyof ValorGrafico>("bid");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;

  //Dados e tipos
  const Data = [
    {
      id: 1,
      nome: "Bitcoin",
      iconName: "bitcoin",
      //fontawosome
      trading: trandingBitcoin,
    },
    {
      id: 2,
      nome: "Ethereum",
      iconName: "ethereum",
      //fontawosome5
      trading: trandingEthereum,
    },
    {
      id: 3,
      nome: "Dogecoin",
      iconName: "dogecoin",
      //MaterialCommunityIcons
      trading: trandingDogecoin,
    },
    {
      id: 4,
      nome: "Litecoin",
      //fontawosome6
      iconName: "litecoin-sign",
      trading: trandingLitecoin,
    },
  ];

  type Moeda = {
    code: string;
    codein: string;
    name: string;
    high: string;
    low: string;
    varBid: string;
    pctChange: string;
    bid: string;
    ask: string;
    timestamp: string;
    create_date: string;
  };

  type ValoresAPI = {
    USDBRL: Moeda;
    EURBRL: Moeda;
    JPYBRL: Moeda;
    BTCBRL: Moeda;
    ETHBRL: Moeda;
    DOGEBRL: Moeda;
    LTCBRL: Moeda;
  };

  type ValorGrafico = {
    bid: string;
    ask: string;
    high: string;
    low: string;
    varBid: string;
    pctChange: string;
    timestamp: string;
    create_date: string;
  };
  //


  //Requisições e APIs
  const valoresAtuais = async () => {
    const url = `https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,JPY-BRL,BTC-BRL,ETH-BRL,DOGE-BRL,LTC-BRL?token=${senhaApi}`;
    try {
      const request = await fetch(url);
      const response: ValoresAPI = await request.json();
      setValores(response);
    } catch (error) {
      console.log("Erro ao buscar valores: ", error);
    }
  };

  const valoresGrafico = async () => {
    const url = "https://economia.awesomeapi.com.br/json/daily/USD-BRL/6";
    try {
      const request = await fetch(url);
      const response = await request.json();
      setValoresGraf(response);
    } catch (error) {
      console.log("Erro ao buscar valores: ",error);
    }
  };

  const valoresGrafBitcoin = async () => {
    const url = "https://economia.awesomeapi.com.br/json/daily/BTC-BRL/3";
    try {
      const request = await fetch(url);
      const response = await request.json();
      setGrafBitcoin(response)
    } catch (error) {
      console.log(error)
    }
  }

  const valoresGrafEthereum = async () => {
    const url = "https://economia.awesomeapi.com.br/json/daily/ETH-BRL/3";

    try {
      const request = await fetch(url);
      const response = await request.json();
      setGrafEthereum(response)
    } catch (error) {
      console.log(error)
    }
  }

  const valoresGrafDogecoin = async () => {
    const url = "https://economia.awesomeapi.com.br/json/daily/DOGE-BRL/3";

    try {
      const request = await fetch(url);
      const response = await request.json();
      setGrafDogecoin(response)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const valoresGrafLitecoin = async () => {
    const url = "https://economia.awesomeapi.com.br/json/daily/LTC-BRL/3";

    try {
      const request = await fetch(url);
      const response = await request.json();
      setGrafLitecoin(response)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    valoresAtuais();
    valoresGrafico();
    valoresGrafBitcoin();
    valoresGrafEthereum();
    valoresGrafDogecoin();
    valoresGrafLitecoin();
  }, []);
  //

  useEffect(() => {
    if (valores && valores.USDBRL){
      const novoValor = parseFloat(valores.USDBRL.bid);

      if (ultimoValor.current !== null) {
        if (novoValor > ultimoValor.current) {
          setIcon("trending-up");
        } else {
          setIcon("trending-down")
        }
      }
    }
  }, [])

  const bitcoinsDates = (dados: any[]) => {
    if (!dados || dados.length === 0) return [];

    const dataInicial = new Date(dados[0].create_date);

    return dados.map((_, index) => {
      const novaData = new Date(dataInicial);
      novaData.setDate(dataInicial.getDate() - index);
      return dataFormat(novaData);
      
    }).reverse()
  }

  const dataFormat = (date: Date): string => {
    return date.toLocaleDateString("pt-br", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  let datas: string[] = [];

  if (valoresGraf) {
    const dataInicial = new Date(valoresGraf[0].create_date);

    datas = valoresGraf.map((_, index) => {
      const novaData = new Date(dataInicial);
      novaData.setDate(dataInicial.getDate() - index);
      return dataFormat(novaData);

    });
  }

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          backgroundColor: "#1b1b1b",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={"#fcf949"} />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ backgroundColor: "#262626", flex: 1 }}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <View
          style={[
            s.line,
            {
              zIndex: 1,
              paddingHorizontal: 15,
              paddingTop: statusBarHeight,
              backgroundColor: "#121212",
              borderBottomWidth: 3,
              borderColor: '#4a4a4a',

            },
          ]}
        >
          <Text style={[s.subititle, { fontSize: 25 }]}>
            Coinde<Text style={{ color: "#fcf949" }}>x</Text>
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "20%",
            }}
          >
            <MaterialIcons name="arrow-drop-down" size={25} color="#fcf949" />
            <Image
              style={s.profileBackground}
              source={require("../src/assets/imgs/usa.png")}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={s.header}>
            <View style={s.card}>
              <View style={{ paddingTop: 25, paddingBottom: 15 }}>
                <View style={[s.line, { padding: 0, width: "95%" }]}>
                  <Text
                    style={[
                      s.subititle,
                      { fontSize: 25, alignSelf: "flex-start" },
                    ]}
                  >
                    Dólar atual<Text style={{ fontSize: 16 }}>(compra)</Text>:
                  </Text>

                  <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                    <Text
                      style={[
                        s.subititle,
                        { fontSize: 25, alignSelf: "flex-start" },
                      ]}
                    >
                      {valores && valores.USDBRL ? (
                          <Text>
                            R$ {valores.USDBRL.bid}
                          </Text>
                      ) : (
                        <ActivityIndicator size={"small"} color={"#fcf949"} />
                      )}
                    </Text>
                    
                     <Feather style={{borderBottomWidth: 2, borderColor: icon == "trending-up" ? "#ff3646"  : "#7aff52"}} name={icon} size={20} color={icon == "trending-up" ? "#ff3646" : "#7aff52"} />
                    
                  </View>
                </View>

                <View style={[s.line, { padding: 0, width: "95%" }]}>
                  <Text
                    style={[s.title, { fontSize: 17, alignSelf: "flex-start" }]}
                  >
                    Valor de venda:
                  </Text>
                  <Text
                    style={[
                      s.subititle,
                      { fontSize: 17, alignSelf: "flex-start" },
                    ]}
                  >
                    {valores && valores.USDBRL ? (
                      `R$ ${valores.USDBRL.ask}`
                    ) : (
                      <ActivityIndicator size={"small"} color={"#fcf949"} />
                    )}
                  </Text>
                </View>


              </View>

              <View
                style={[
                  s.line,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "95%",
                  },
                ]}
              >
                <Text style={s.subititle}>Gráfico: </Text>

                <TouchableOpacity
                  onPress={toggleModal}
                  style={{
                    backgroundColor: "#242424",
                    borderRadius: 5,
                    width: 130,
                    height: 40,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text style={s.text}>
                    {selectGraf == "bid"
                      ? "Compra"
                      : selectGraf == "ask"
                      ? "Venda"
                      : selectGraf == "high"
                      ? "Mais alto"
                      : "Mais baixo"}
                  </Text>

                  <MaterialIcons
                    name="arrow-drop-down"
                    size={25}
                    color="#fcf949"
                  />
                </TouchableOpacity>
              </View>

              <View style={{ borderRadius: 10, overflow: "hidden" }}>
                <LineChart
                  data={{
                    labels: datas.length > 0 ? datas.reverse() : ["Sem dados"],
                    datasets: [
                      {
                        data: valoresGraf
                          ? valoresGraf.map((item) =>
                              parseFloat(item[selectGraf])
                            ).reverse()
                          : [0],
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width}
                  height={200}
                  yAxisLabel="R$"
                  yLabelsOffset={7}
                  chartConfig={{
                    backgroundColor: "#1b1b1b",
                    backgroundGradientFrom: "#121212",
                    backgroundGradientTo: "#121212",
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

              <View style={{  paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 25}}>
                <View style={[ { alignItems: 'center', justifyContent: 'center' }]}>
                  <Text
                    style={[s.title, { fontSize: 17 }]}
                  >
                    Valor mais alto(hoje):
                  </Text>
                  <Text
                    style={[
                      s.subititle,
                      { fontSize: 17  },
                    ]}
                  >
                    {valores && valores.USDBRL ? (
                      `R$ ${valores.USDBRL.high}`
                    ) : (
                      <ActivityIndicator size={"small"} color={"#fcf949"} />
                    )}
                  </Text>
                </View>
                <View style={[ { alignItems: 'center', justifyContent: 'center' }]}>
                  <Text
                    style={[s.title, { fontSize: 17 }]}
                  >
                    Valor mais baixo(hoje):
                  </Text>
                  <Text
                    style={[
                      s.subititle,
                      { fontSize: 17 },
                    ]}
                  >
                    {valores && valores.USDBRL ? (
                      `R$ ${valores.USDBRL.low}`
                    ) : (
                      <ActivityIndicator size={"small"} color={"#fcf949"} />
                    )}
                  </Text>
                </View>
              </View>

            </View>
          </View>

          <View style={[s.flatList]}>
            <Text
              style={[
                s.subititle,
                { alignSelf: "flex-start", marginHorizontal: 15 },
              ]}
            >
              Criptomoedas:
            </Text>

            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={Data}
              style={{height: 500}}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View
                  style={s.bitcoinCont}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 15,
                      alignItems: "center",
                      justifyContent: 'space-between',
                      padding: 15,
                      width: '100%'
                    }}
                  >
                    <View style={{flexDirection: 'row', alignItems: 'center',  width: 140}}>
                      <View
                        style={[
                          s.profileBackground,
                          { borderWidth: 2, borderColor: "#4a4a4a" },
                        ]}
                      >
                        {item.iconName === "bitcoin" ? (
                          <FontAwesome name="bitcoin" size={24} color="#fcf949" />
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
                      <Text style={[s.subititle, {paddingLeft: 15}]}>
                        {item.nome}{" "}
                        {item.trading ? (
                          <Feather name="trending-up" size={20} color="#ff3646" />
                        ) : (
                          <Feather name="trending-down" size={20} color="#7aff52" />
                        )}
                      </Text>
                    </View>
                    <Text style={[s.subititle, {fontSize: 20}]}>
                      {valores ? (
                        item.nome === "Bitcoin" ? (
                          `R$ ${valores.BTCBRL?.bid}`
                        ) : item.nome === "Ethereum" ? (
                          `R$ ${valores.ETHBRL?.bid}`
                        ) : item.nome === "Dogecoin" ? (
                          `R$ ${valores.DOGEBRL?.bid}`
                        ) : item.nome === "Litecoin" ? (
                          `R$ ${valores.LTCBRL?.bid}`
                        ) : (
                          <Text>Moeda não encontrada</Text>
                        )
                      ) : (
                        <ActivityIndicator size="small" color="#fcf949" />
                      )}
                    </Text>
                  </View>
                  
                  <LineChart
                  data={{
                    labels: bitcoinsDates(grafBitcoin ?? []),
                    datasets: [
                      {
                        data: 
                          item.nome === "Bitcoin" && grafBitcoin
                            ? grafBitcoin.map((d) => parseFloat(d[selectGraf])).reverse()
                            : item.nome === "Ethereum" && grafEthereum
                            ? grafEthereum.map((d) => parseFloat(d[selectGraf])).reverse()
                            : item.nome === "Dogecoin" && grafDogecoin
                            ? grafDogecoin.map((d) => parseFloat(d[selectGraf])).reverse()
                            : item.nome === "Litecoin" && grafLitecoin
                            ? grafLitecoin.map((d) => parseFloat(d[selectGraf])).reverse()
                            : [0],
                      },
                    ],
                  }}
                  width={330}
                  height={200}
                  yAxisLabel="R$"
                  yLabelsOffset={7}
                  chartConfig={{
                    backgroundColor: "#1b1b1b",
                    backgroundGradientFrom: "#121212",
                    backgroundGradientTo: "#121212",
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

                <View>
                  <Text style={s.title}>SÓPATESTA</Text>
                </View>
                </View>
              )}
            />
          </View>
        </ScrollView>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal} // Fecha ao tocar fora do modal
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <View style={s.modal}>
            <Text style={s.title}>Selecione o filtro:</Text>

            <View style={{ gap: 15, width: "80%" }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectGraf("high"), toggleModal();
                }}
                style={s.optionsButton}
              >
                <Text style={s.text}>Valor mais alto</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectGraf("low"), toggleModal();
                }}
                style={s.optionsButton}
              >
                <Text style={s.text}>Valor mais baixo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectGraf("bid"), toggleModal();
                }}
                style={s.optionsButton}
              >
                <Text style={s.text}>Valor de compra</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectGraf("ask"), toggleModal();
                }}
                style={s.optionsButton}
              >
                <Text style={s.text}>Valor de venda</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={toggleModal}
              style={[
                s.optionsButton,
                {
                  borderWidth: 2,
                  borderColor: "#fcf949",
                  backgroundColor: "#121212",
                  width: "80%",
                },
              ]}
            >
              <Text style={s.text}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    borderBottomEndRadius: 20,
    backgroundColor: "#121212",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    elevation: 15,
  },

  container: {
    minHeight: 150,
    maxHeight: 350,
    width: "100%",
    paddingVertical: 20,
  },

  flatList: {
    height: 450,
    width: "100%",
    paddingVertical: 20,
  },

  bitcoinCont: {
    height: 350,
    width: 350,
    margin: 10,
    gap: 10,
    backgroundColor: "#121212",
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: "space-between",
    elevation: 10
  },

  line: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
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

  modal: {
    height: 350,
    backgroundColor: "#121212",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionsButton: {
    backgroundColor: "#242424",
    borderRadius: 5,
    padding: 5,
    paddingLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
});
