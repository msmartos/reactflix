import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';

function CadastroCategoria(){
  const valoresIniciais = {
      titulo: '',
      descricao: '',
      cor: '',
  }

  const {handleChange, values, clearForm} = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const URL_TOP = window.location.hostname.includes('localhost')
      ? 'http://localhost:8001/categorias'
      : 'https://aluraflixx.herokuapp.com/categorias';

    fetch(URL_TOP)
    .then(async (respostaDoServidor) => {
      const resposta = await respostaDoServidor.json();
      setCategorias([
        ...resposta,
      ]);
    })

    // setTimeout(() => {
    //   setCategorias([
    //     ...categorias,
    //     {
    //       "id": 1,
    //       "titulo": "Front End",
    //       "descricao": "Categoria",
    //       "cor": "#6bd1ff"
    //     }
    //
    //   ]);
    // }, 4000);



  }, []);


  return (
    <PageDefault>
      <h1>Cadastro de Categoria: { values.titulo }</h1>

      <form onSubmit={ function handleSubmit(e) {
        e.preventDefault();
        setCategorias([
          ...categorias,
          values
        ]);

        clearForm();
      }}>

        <FormField
          label="Título da categoria"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && (
        <div>
          Loading...
        </div>
      )}

      <ul>
        {categorias.map((categoria) => {
          return(
            <li key={`${categoria.titulo}`}>{categoria.titulo}</li>
          )
        })}
      </ul>


      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  )
}

export default CadastroCategoria
