import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js"

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name;
            setValues({
                ...values,
                [name]: value,
            });

        },
        clearForm() {
            setValues({});
        }
    };
}
const PROJECT_URL = "https://cfqjmxomcizhngurwiue.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcWpteG9tY2l6aG5ndXJ3aXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk0ODYzNjcsImV4cCI6MTk4NTA2MjM2N30.1k19ZSiFLIY6tjcqP5BoANlOO86JeirptK-mMZYolDM"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Frost punk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk" }
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    // console.log(supabase.from("video").insert())

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        console.log(formCadastro.values)

                        //contrato entre o nosso front e o backend
                        supabase.from("video").insert({
                            title:formCadastro.values.titulo,
                            url:formCadastro.values.url,
                            thumb:getThumbnail(formCadastro.values.url),
                            playlist:"jogos",
                        })

                        .then((oqueveio) => {
                            console.log(oqueveio)
                        })

                        .catch(() => {
                            console.log(err)
                        })



                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                x
                            </button>
                            <input
                                placeholder="Titulo do Vídeo"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange}
                            />
                            <input
                                placeholder="URL"
                                name="url"
                                value={formCadastro.values.url}
                               onChange={formCadastro.handleChange}
                            />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>

                    </form>
                )
                : false}
        </StyledRegisterVideo>
    )
}