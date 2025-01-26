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
  Ionicons,
} from "@expo/vector-icons";

export default function Home() {
  const [trandingBitcoin, setTrandingBitcoin] = useState(true);
  const [trandingEthereum, setTrandingEthereum] = useState(false);
  const [trandingDogecoin, setTrandingDogecoin] = useState(true);
  const [trandingLitecoin, setTrandingLitecoin] = useState(false);

  const [moeda, setMoeda] = useState<string>("Dólar");

  const [valores, setValores] = useState<ValoresAPI | null>(null);
  const [valoresGraf, setValoresGraf] = useState<ValorGrafico[] | null>(null);

  const [grafBitcoin, setGrafBitcoin] = useState<ValorGrafico[] | null>(null);
  const [grafEthereum, setGrafEthereum] = useState<ValorGrafico[] | null>(null);
  const [grafDogecoin, setGrafDogecoin] = useState<ValorGrafico[] | null>(null);
  const [grafLitecoin, setGrafLitecoin] = useState<ValorGrafico[] | null>(null);

  const ultimoValorCompra = useRef<number | null>(null);
  const ultimoValorVenda = useRef<number | null>(null);

  const ultimoValorBitcoin = useRef<number | null>(null)
  const ultimoValorEthereum = useRef<number | null>(null)
  const ultimoValorDogecoin = useRef<number | null>(null)
  const ultimoValorLitecoin = useRef<number | null>(null)

  const [iconBitcoinBid, setBitcoinBid] = useState<"trending-up" | "trending-down">();
  const [iconEthereumBid, setEthereumBid] = useState<"trending-up" | "trending-down">();
  const [iconDogecoinBid, setDogecoinBid] = useState<"trending-up" | "trending-down">();
  const [iconLitecoinBid, setLitecoinBid] = useState<"trending-up" | "trending-down">();

  const [iconBid, setIconBid] = useState<"trending-up" | "trending-down">();
  const [iconAsk, setIconAsk] = useState<"trending-up" | "trending-down">();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownGrafVisible, setIsDropdownGrafVisible] = useState(false);

  const [selectGraf, setSelectGraf] = useState<keyof ValorGrafico>("bid");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : 0;

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

  const opcoesGrafico = [
    { label: "Mais alto", value: "high" },
    { label: "Mais baixo", value: "low" },
    { label: "Compra", value: "bid" },
    { label: "Venda", value: "ask" },
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
    const coinurl =
      moeda === "Dólar" ? "USD-BRL" : moeda === "Euro" ? "EUR-BRL" : "JPY-BRL";

    const url = `https://economia.awesomeapi.com.br/json/daily/${coinurl}/6`;
    try {
      const request = await fetch(url);
      const response = await request.json();
      setValoresGraf(response);
    } catch (error) {
      console.log("Erro ao buscar valores: ", error);
    }
  };

  const valoresGrafBitcoin = async () => {
    const url = "https://economia.awesomeapi.com.br/json/daily/BTC-BRL/3";
    try {
      const request = await fetch(url);
      const response = await request.json();
      setGrafBitcoin(response);
    } catch (error) {
      console.log("Erro grafico Bitcoin", error);
    }
  };

  const valoresGrafEthereum = async () => {
    const url = "https://economia.awesomeapi.com.br/json/daily/ETH-BRL/3";

    try {
      const request = await fetch(url);
      const response = await request.json();
      setGrafEthereum(response);
    } catch (error) {
      console.log("Erro grafico Ethereum: ",error);
    }
  };

  const valoresGrafDogecoin = async () => {
    const url = "https://economia.awesomeapi.com.br/json/daily/DOGE-BRL/3";

    try {
      const request = await fetch(url);
      const response = await request.json();
      setGrafDogecoin(response);
    } catch (error) {
      console.log("Erro grafico Dogecoin",error);
    }
  };

  const valoresGrafLitecoin = async () => {
    const url = "https://economia.awesomeapi.com.br/json/daily/LTC-BRL/3";

    try {
      const request = await fetch(url);
      const response = await request.json();
      setGrafLitecoin(response);
    } catch (error) {
      console.log("Erro grafico Litecoin",error);
    }
  };

  useEffect(() => {
    const fetchAll = () => {
      valoresAtuais();
      valoresGrafico();
      valoresGrafBitcoin();
      valoresGrafEthereum();
      valoresGrafDogecoin();
      valoresGrafLitecoin();
    };

    fetchAll();

    const interval = setInterval(fetchAll, 5000);

    return () => clearInterval(interval);
  }, [moeda]);
  //

  useEffect(() => {
    if (moeda === "Dólar") {
      if (valores && valores.USDBRL) {
        const novoValor = parseFloat(valores.USDBRL.bid);

        if (ultimoValorCompra.current !== null) {


          if (novoValor > ultimoValorCompra.current) {
            setIconBid("trending-up");
          } else if (novoValor < ultimoValorCompra.current) {
            setIconBid("trending-down");
          }
        

        }

        ultimoValorCompra.current = novoValor;
        //console.log("Ultimo valor de compra: ", ultimoValorCompra);
      }

      if (valores && valores.USDBRL) {
        const novoValor = parseFloat(valores.USDBRL.ask);

        if (ultimoValorVenda.current !== null) {


          if (novoValor > ultimoValorVenda.current) {
            setIconAsk("trending-up");
          } else if (novoValor < ultimoValorVenda.current) {
            setIconAsk("trending-down");
          }
        

        }
        ultimoValorVenda.current = novoValor;
        //console.log("Ultimo valor de venda: ", ultimoValorVenda);
      }
    }

    if (moeda === "Euro") {
      if (valores && valores.EURBRL) {
        const novoValor = parseFloat(valores.EURBRL.bid);

        if (ultimoValorCompra.current !== null) {


          if (novoValor > ultimoValorCompra.current) {
            setIconBid("trending-up");
          } else if (novoValor < ultimoValorCompra.current){
            setIconBid("trending-down");
          }
        

        }
        ultimoValorCompra.current = novoValor;
        console.log("Ultimo valor de compra: ", ultimoValorCompra);
      }

      if (valores && valores.EURBRL) {
        const novoValor = parseFloat(valores.EURBRL.ask);

        if (ultimoValorVenda.current !== null) {


          if (novoValor > ultimoValorVenda.current) {
            setIconAsk("trending-up");
          } else if (novoValor < ultimoValorVenda.current) {
            setIconAsk("trending-down");
          }
        

        }
        ultimoValorVenda.current = novoValor;
        console.log("Ultimo valor de venda: ", ultimoValorVenda);
      }
    }

    if (moeda === "Iene") {
      if (valores && valores.JPYBRL) {
        const novoValor = parseFloat(valores.JPYBRL.bid);

        if (ultimoValorCompra.current !== null) {

          if (novoValor > ultimoValorCompra.current) {
            setIconBid("trending-up");
          } else if (novoValor < ultimoValorCompra.current) {
            setIconBid("trending-down");
          }
        
      }
        ultimoValorCompra.current = novoValor;
      }

      if (valores && valores.JPYBRL) {
        const novoValor = parseFloat(valores.JPYBRL.ask);

        if (ultimoValorVenda.current !== null) {
          

          if (novoValor > ultimoValorVenda.current) {
            setIconAsk("trending-up");
          } else if (novoValor < ultimoValorVenda.current) {
            setIconAsk("trending-down");
          }
        

        }
        ultimoValorVenda.current = novoValor;
      }
    }

    if (valores && valores.BTCBRL){
      const novoValor = parseFloat(valores.BTCBRL.bid);

      if(ultimoValorBitcoin.current !== null) {


        if (novoValor > ultimoValorBitcoin.current) {
          setBitcoinBid("trending-up");
        } else if (novoValor < ultimoValorBitcoin.current) {
          setBitcoinBid("trending-down");
        }
      

      }
      ultimoValorBitcoin.current  = novoValor;
    }

    if (valores && valores.ETHBRL){
      const novoValor = parseFloat(valores.ETHBRL.bid);

      if(ultimoValorEthereum.current !== null) {


        if (novoValor > ultimoValorEthereum.current) {
          setEthereumBid("trending-up");
        } else if (novoValor < ultimoValorEthereum.current) {
          setEthereumBid("trending-down");
        }
      

      }
      ultimoValorEthereum.current  = novoValor;
    }

    if (valores && valores.DOGEBRL){
      const novoValor = parseFloat(valores.DOGEBRL.bid);

      if(ultimoValorDogecoin.current !== null) {

          if (novoValor > ultimoValorDogecoin.current) {
            setDogecoinBid("trending-up");
          } else if (novoValor < ultimoValorDogecoin.current) {
            setDogecoinBid("trending-down");
          }
        
      }
      ultimoValorDogecoin.current  = novoValor;
    }

    if (valores && valores.LTCBRL){
      const novoValor = parseFloat(valores.LTCBRL.bid);

      

      if(ultimoValorLitecoin.current !== null) {
          if (novoValor > ultimoValorLitecoin.current) {
            setLitecoinBid("trending-up");
          } else if (novoValor < ultimoValorLitecoin.current) {
            setLitecoinBid("trending-down");
          }

      }
      ultimoValorLitecoin.current  = novoValor;

      console.log("Último valor:", ultimoValorLitecoin.current, "Novo valor:", novoValor);
    }
  }, [valores]);

  const bitcoinsDates = (dados: any[]) => {
    if (!dados || dados.length === 0) return [];

    const dataInicial = new Date(dados[0].create_date);

    return dados
      .map((_, index) => {
        const novaData = new Date(dataInicial);
        novaData.setDate(dataInicial.getDate() - index);
        return dataFormat(novaData);
      })
      .reverse();
  };

  const dataFormat = (date: Date): string => {
    return date.toLocaleDateString("pt-br", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const toggleDropdownMoedas = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleDropdownGrafMoedas = () => {
    setIsDropdownGrafVisible(!isDropdownGrafVisible);
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
              paddingTop: statusBarHeight,
              backgroundColor: "#121212",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <View
            style={[
              s.line,
              {
                backgroundColor: "#222222",
                borderRadius: 20,
                paddingHorizontal: 20,
                width: "100%",
              },
            ]}
          >
            <Text style={[s.subititle, { fontSize: 25 }]}>
              Coinde<Text style={{ color: "#fcf949" }}>x</Text>
            </Text>

            <TouchableOpacity onPress={toggleModal}>
              <FontAwesome name="question-circle-o" size={35} color="#fcf949" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={s.header}>
            <TouchableOpacity
              onPress={toggleDropdownMoedas}
              activeOpacity={0.6}
              style={{
                flexDirection: "row",
                width: "95%",
                paddingHorizontal: 15,
                marginVertical: 15,
                alignItems: "center",
                justifyContent: "space-between",
                borderWidth: 2,
                borderRadius: 20,
                borderColor: "#fcf949",
                padding: 15,
              }}
            >
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Text style={[s.subititle, { fontSize: 25 }]}>
                  {moeda} atual
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "20%",
                }}
              >
                <MaterialIcons
                  name="arrow-drop-down"
                  size={25}
                  color="#fcf949"
                />
                <Image
                  style={s.profileBackground}
                  source={
                    moeda === "Dólar"
                      ? require("../src/assets/imgs/usa.png")
                      : moeda === "Euro"
                      ? require("../src/assets/imgs/european.png")
                      : require("../src/assets/imgs/japan.png")
                  }
                />
              </View>
            </TouchableOpacity>

            {isDropdownVisible && (
              <View style={[s.dropdown, { top: 100 }]}>
                {["Dólar", "Euro", "Iene"].map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setMoeda(option),
                        toggleDropdownMoedas(),
                        valoresGrafico();
                    }}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                    }}
                  >
                    <Text style={[s.text, { fontSize: 18 }]}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={s.card}>
              <View style={{ paddingBottom: 15 }}>
                <View style={[s.line, { padding: 0, width: "95%" }]}>
                  <Text
                    style={[
                      s.subititle,
                      { fontSize: 20, alignSelf: "flex-start" },
                    ]}
                  >
                    Valor de compra:
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        s.subititle,
                        { fontSize: 25, alignSelf: "flex-start" },
                      ]}
                    >
                      {valores ? (
                        <Text>
                          R${" "}
                          {moeda === "Dólar"
                            ? valores.USDBRL.bid
                            : moeda === "Euro"
                            ? valores.EURBRL.bid
                            : moeda === "Iene"
                            ? valores.JPYBRL.bid
                            : "Sem dados"}
                        </Text>
                      ) : (
                        <ActivityIndicator size={"small"} color={"#fcf949"} />
                      )}
                    </Text>

                    <Feather
                      name={iconBid}
                      size={25}
                      color={iconBid == "trending-up" ? "#ff3646" : "#7aff52"}
                    />
                  </View>
                </View>

                <View style={[s.line, { padding: 0, width: "95%" }]}>
                  <Text
                    style={[
                      s.subititle,
                      { fontSize: 20, alignSelf: "flex-start" },
                    ]}
                  >
                    Valor de venda:
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        s.subititle,
                        { fontSize: 25, alignSelf: "flex-start" },
                      ]}
                    >
                      {valores ? (
                        <Text>
                          R${" "}
                          {moeda === "Dólar"
                            ? valores.USDBRL.ask
                            : moeda === "Euro"
                            ? valores.EURBRL.ask
                            : moeda === "Iene"
                            ? valores.JPYBRL.ask
                            : "Sem dados"}
                        </Text>
                      ) : (
                        <ActivityIndicator size={"small"} color={"#fcf949"} />
                      )}
                    </Text>

                    <Feather
                      name={iconAsk}
                      size={25}
                      color={iconAsk == "trending-up" ? "#ff3646" : "#7aff52"}
                    />
                  </View>
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
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <FontAwesome5 name="chart-area" size={24} color="#fcf949" />
                  <Text style={s.subititle}>Gráficos: </Text>
                </View>

                <View>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={toggleDropdownGrafMoedas}
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
                  {isDropdownGrafVisible && (
                    <View style={[s.dropdownGraf, { top: 35 }]}>
                      {opcoesGrafico.map((option, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setSelectGraf(option.value as keyof ValorGrafico);
                            toggleDropdownGrafMoedas();
                          }}
                          style={{
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                          }}
                        >
                          <Text style={[s.text, { fontSize: 16 }]}>
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              <View style={{ borderRadius: 10, overflow: "hidden" }}>
                <LineChart
                  data={{
                    labels: datas.length > 0 ? datas.reverse() : ["Sem dados"],
                    datasets: [
                      {
                        data: valoresGraf
                          ? valoresGraf
                              .map((item) => parseFloat(item[selectGraf]))
                              .reverse()
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
                      r: "2",
                      strokeWidth: "5",
                      stroke: "#8cff8a",
                    },
                  }}
                  bezier
                  style={{
                    elevation: 20,
                  }}
                />
              </View>

              <View
                style={{
                  paddingVertical: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 25,
                }}
              >
                <View
                  style={[{ alignItems: "center", justifyContent: "center" }]}
                >
                  <Text style={[s.title, { fontSize: 17 }]}>
                    Valor mais alto(hoje):
                  </Text>
                  <Text style={[s.subititle, { fontSize: 17 }]}>
                    {valores ? (
                      <Text>
                        R${" "}
                        {moeda === "Dólar"
                          ? valores.USDBRL.high
                          : moeda === "Euro"
                          ? valores.EURBRL.high
                          : moeda === "Iene"
                          ? valores.JPYBRL.high
                          : "Sem dados"}
                      </Text>
                    ) : (
                      <ActivityIndicator size={"small"} color={"#fcf949"} />
                    )}
                  </Text>
                </View>
                <View
                  style={[{ alignItems: "center", justifyContent: "center" }]}
                >
                  <Text style={[s.title, { fontSize: 17 }]}>
                    Valor mais baixo(hoje):
                  </Text>
                  <Text style={[s.subititle, { fontSize: 17 }]}>
                    {valores ? (
                      <Text>
                        R${" "}
                        {moeda === "Dólar"
                          ? valores.USDBRL.low
                          : moeda === "Euro"
                          ? valores.EURBRL.low
                          : moeda === "Iene"
                          ? valores.JPYBRL.low
                          : "Sem dados"}
                      </Text>
                    ) : (
                      <ActivityIndicator size={"small"} color={"#fcf949"} />
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[s.flatList]}>
            <View
              style={{ marginHorizontal: 15, flexDirection: "row", gap: 10 }}
            >
              <Ionicons name="logo-bitcoin" size={24} color="#fcf949" />
              <Text style={[s.subititle, { alignSelf: "flex-start" }]}>
                Criptomoedas:
              </Text>
            </View>

            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={Data}
              style={{ height: 500 }}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={s.bitcoinCont}>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 15,
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: 15,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: 140,
                      }}
                    >
                      <View
                        style={[
                          s.profileBackground,
                          { borderWidth: 2, borderColor: "#4a4a4a" },
                        ]}
                      >
                        {item.iconName === "bitcoin" ? (
                          <FontAwesome
                            name="bitcoin"
                            size={24}
                            color="#fcf949"
                          />
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
                      <Text style={[s.subititle, { paddingLeft: 15 }]}>
                        {item.nome}{" "}

                          <Feather
                            name={item.nome === "Bitcoin" ? iconBitcoinBid : item.nome === "Ethereum" ? iconEthereumBid : item.nome === "Dogecoin" ? iconDogecoinBid : iconLitecoinBid }
                            size={20}
                            color={ item.nome === "Bitcoin" && iconBitcoinBid === "trending-up" ? "#ff3646" : item.nome === "Ethereum" && iconEthereumBid === "trending-up" ? "#ff3646" : item.nome === "Dogecoin" && iconDogecoinBid === "trending-up" ? "#ff3646" : item.nome === "Litecoin" && iconLitecoinBid === "trending-up" ? "#ff3646" : "#7aff52"}
                          />
                        
                      </Text>
                    </View>
                    <Text style={[s.subititle, { fontSize: 20 }]}>
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
                              ? grafBitcoin
                                  .map((d) => parseFloat(d[selectGraf]))
                                  .reverse()
                              : item.nome === "Ethereum" && grafEthereum
                              ? grafEthereum
                                  .map((d) => parseFloat(d[selectGraf]))
                                  .reverse()
                              : item.nome === "Dogecoin" && grafDogecoin
                              ? grafDogecoin
                                  .map((d) => parseFloat(d[selectGraf]))
                                  .reverse()
                              : item.nome === "Litecoin" && grafLitecoin
                              ? grafLitecoin
                                  .map((d) => parseFloat(d[selectGraf]))
                                  .reverse()
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
                        r: "2",
                        strokeWidth: "5",
                        stroke:
                          item.nome === "Bitcoin"
                            ? "#fcf949"
                            : item.nome === "Ethereum"
                            ? "#42cbf5"
                            : item.nome === "Dogecoin"
                            ? "#f4f4f4"
                            : "#6b5fed",
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
            <Text style={s.title}>Sobre o Coinde<Text style={{ color: "#fcf949" }}>x</Text></Text>

            <View style={{ gap: 15, width: "80%" }}>
              <Text style={[s.text]}>
                O Coindex é um aplicativo que permite acompanhar e analisar, em tempo real, as cotações de moedas como o Dólar e o Euro, além das principais criptomoedas do mercado. Tudo isso utilizando a poderosa API de cotações da Awesome API.
                {`\n`}
                {`\n`}
                O Aplicativo ainda está em desenvolvimento e receberá mais atualizações no 
                futuro
              </Text>
            </View>
            <TouchableOpacity
              onPress={toggleModal}
              style={[
                s.optionsButton,
                {
                  borderWidth: 2,
                  borderColor: "#fcf949",
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
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 10,
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
    height: 400,
    backgroundColor: "#242424",
    borderRadius: 15,
    paddingVertical: 25,
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

  dropdown: {
    position: "absolute",
    backgroundColor: "#292929",
    width: "95%",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fcf949",
    padding: 10,
    zIndex: 1,
  },

  dropdownGraf: {
    position: "absolute",
    backgroundColor: "#242424",
    width: "100%",
    padding: 10,
    zIndex: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
