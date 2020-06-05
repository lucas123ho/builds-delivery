import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import PageList from "@components/PageList";
import { setFormaPagamento } from "@root/utils/dispatch";
import { ApplicationState } from "@root/store";
import { FormaPagamento } from "@root/types/db";
import { getFormasPagamento } from "@root/utils/functions";

const categoria = [
  {
    title: "Dinheiro",
    id: 1,
  },
  {
    title: "Cartão de Crédito",
    id: 2,
  },
  {
    title: "Cartão de Debito",
    id: 3,
   
  },
];

export default function Categoria() {
  const [loading, setLoading] = useState(true);
  const [formasPagamento, setFormasPagamento] = useState<FormaPagamento[]>([])
  const navigation = useNavigation();
  const { forma_pagamento } = useSelector((state: ApplicationState) => state.sale);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const formasPagamento = await getFormasPagamento();
      setFormasPagamento(formasPagamento);
      setLoading(false);
    }
    getData();
  }, []);

  function handleSelect(item) {
    dispatch(setFormaPagamento({
      forma_pagamento: item
    }));
    navigation.goBack();
  }

  return (
    <PageList
      title="Formas de pagamentos"
      info="Estas são as formas de pagamentos que aceitamos"
      data={formasPagamento}
      keys={{
        title: "nmPagamento",
        id: "Id",
        description: "Pag_Obs"
      }}
      loading={loading}
      onSelect={(item) => handleSelect(item)}
      icon="credit-card"
      selected={forma_pagamento?.nmPagamento}
    />
  );
}
