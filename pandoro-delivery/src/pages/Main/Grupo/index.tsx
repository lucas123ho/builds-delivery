import React, { useEffect, useState, useMemo } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { Content } from "@styles/components";
import { getOneGrupo } from "@root/utils/functions";
import {
  GrupoWithSubGruposWithProdutos,
} from "../../../types/db";
import { ApplicationState } from "@root/store";
import colors from "@root/styles/colors";
import TitlePage from "@root/components/TitlePage";
import ListItems from "@root/components/ListItems";
import { Container } from "./styles";
import { ContainerLoading } from "../Busca/styles";
import HeaderIput from "@components/HeaderInput";
import ButtonFinalize from "@root/components/ButtonFinalize";

export default function Grupo({ route }) {
  const { grupo_id, title } = route.params;
  const { items: grupos } = useSelector(
    (state: ApplicationState) => state.grupos
  );
  const grupo = useMemo(
    () => grupos.filter((grupo) => grupo.Id === grupo_id)[0],
    [grupos]
  );
  const [grupoSearch, setGrupoSearch] = useState<
    GrupoWithSubGruposWithProdutos
  >(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [searching, setSearching] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  const navigation = useNavigation();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const grupo = await getOneGrupo(grupo_id, search);
      setLoading(false);
      setGrupoSearch(grupo);
    }
    if (search) {
      clearTimeout(timer);
      setTimer(setTimeout(getData, 1000));
    }
  }, [search]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Content style={{ paddingBottom: 0 }}>
        {searching ? (
          <HeaderIput
            onBack={() => {
              setSearch("");
              setTimeout(() => setSearching(false), 500);
            }}
            search={search}
            setSearch={setSearch}
            style={{
              marginTop: 0,
              borderRadius: 5,
            }}
          />
        ) : (
          <TitlePage
            title={title}
            search={true}
            onSearch={() => setSearching(true)}
          />
        )}
        {loading ? (
          <ContainerLoading>
            <ActivityIndicator color={colors.blue} size={30} />
          </ContainerLoading>
        ) : !search ? (
          <Container
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          >
            {grupo?.subGrupos?.map((subGrupo) => {
              if (subGrupo?.produtos?.length !== 0) {
                return (
                  <ListItems
                    name={subGrupo?.nmSubGrupo}
                    items={subGrupo?.produtos}
                    key={String(subGrupo?.Id)}
                    onPlus={() =>
                      navigation.navigate("SubGrupo", {
                        title_grupo: title,
                        title: subGrupo?.nmSubGrupo,
                        subGrupo_id: subGrupo?.Id,
                        grupo_id: grupo?.Id
                      })
                    }
                    plus={subGrupo?.__meta__?.produtos_count > subGrupo?.produtos?.length}
                  />
                );
              }
            })}
          </Container>
        ) : (
          <Container
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          >
            {grupoSearch?.subGrupos?.map((subGrupo) => {
              if (subGrupo?.produtos?.length !== 0) {
                return (
                  <ListItems
                    name={subGrupo?.nmSubGrupo}
                    items={subGrupo?.produtos}
                    key={String(subGrupo?.Id)}
                    onPlus={() =>
                      navigation.navigate("SubGrupo", {
                        title_grupo: title,
                        title: subGrupo?.nmSubGrupo,
                        subGrupo_id: subGrupo?.Id,
                        grupo_id: grupo?.Id
                      })
                    }
                    plus={subGrupo?.__meta__?.produtos_count > subGrupo?.produtos?.length}
                  />
                );
              }
            })}
          </Container>
        )}
      </Content>
      <ButtonFinalize />
    </SafeAreaView>
  );
}
