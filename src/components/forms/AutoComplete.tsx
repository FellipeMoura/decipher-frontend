import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { AutocompleteProps } from '@mui/material/Autocomplete';
import { useDebounce } from '../../shared/hooks/UseDebounce';
import { useController, useFormContext } from 'react-hook-form';
import { ProdutosService } from '../../api/services/ProdutosService';

type TAutoCompleteOption = {
  id: number;
  label: string;
  preco_venda: number;
  SP: number;
};

interface IAutoCompleteProps {
  isExternalLoading?: boolean;
  name?: string;
  handleSelect?: (value: TAutoCompleteOption) => void;
}

export const AutoCompleteProduto: React.FC<IAutoCompleteProps> = ({ handleSelect, name = 'idproduto', isExternalLoading = false }) => {
  const { control, setValue } = useFormContext();

  const { field: { onChange, value }, fieldState: { error } } = useController({
    name,
    control,
    defaultValue: undefined,
  });

  const { debounce } = useDebounce();

  const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState('');

  useEffect(() => {
   
     
    if(!value){
    setIsLoading(true)
      debounce(() => {
        ProdutosService.getAll({ filter: busca })
          .then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              // alert(result.message);
            } else {
              setOpcoes(result.data.map((element: any) => ({
                id: element.id,
                label: `${element.id}. ${element.nome}`,
                preco_venda: element.preco_venda,
                SP: element.SP,
              })));
            }
          });
      });
    }
  }, [busca, debounce]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!value) return null;

    const selectedOption = opcoes.find(opcao => opcao.id === value);
    return selectedOption || null;
  }, [value, opcoes]);

  function onSelect(newValue: TAutoCompleteOption | null) {
    onChange(newValue?.id);
    setBusca('');
    if (newValue) {
      setValue('total', Number(newValue.preco_venda));
      typeof handleSelect === 'function' && handleSelect(newValue);
      
    }
  }

  const autocompleteProps: AutocompleteProps<TAutoCompleteOption, false, false, false> = {
    options: opcoes,
    loading: isLoading || isExternalLoading,
    value: autoCompleteSelectedOption,
    disablePortal: false,
    openText: 'Abrir',
    closeText: 'Fechar',
    noOptionsText: 'Sem opções',
    loadingText: 'Carregando...',
    onInputChange: (_, newValue) => setBusca(newValue),
    onChange: (_, newValue) => {
      onSelect(newValue);
    },
    renderInput: (params) => (
      <TextField

        {...params}
        label="Procedimento"
        error={!!error}
        helperText={error?.message}
      />
    ),
  };

  return (
    <Autocomplete
      sx={{
        '& .MuiAutocomplete-popupIndicator': {
          // Estilos adicionais se necessário
        },
        '& .MuiAutocomplete-option': {
          fontSize: '0.8rem', // Alternativamente, você pode definir aqui
        },
        // Ajustar o tamanho geral do componente se necessário
        '& .MuiInputBase-root': {
          fontSize: '0.8rem',
        },
      }}
      {...autocompleteProps}
      popupIcon={isExternalLoading || isLoading ? <CircularProgress size={28} /> : undefined}
    />
  );
};