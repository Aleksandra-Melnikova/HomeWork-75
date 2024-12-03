import React, { useState } from 'react';

import { Button, TextField} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Grid from '@mui/material/Grid2';
import {IForm} from "../../types";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {useAppDispatch} from "../../app/hooks.ts";
import {fetchEncode} from "./FormThunk.ts";
import {toast} from "react-toastify";





const ProductForm = () => {
    const dispatch = useAppDispatch();

    const [form, setForm] = useState<IForm>(
        {  decoded: '',
            password: '',
            encoded: ''}
    );

    const clickEncode = async () => {
        console.log(form.password.trim().length);
        console.log(form.encoded.trim().length);
        if(form.password.trim().length > 0 && form.encoded.trim().length > 0){
            await dispatch(fetchEncode({encoded:form.encoded, password: form.password}))
        }
        else{
            toast.error('Заполните необходимые поля')
        }
        console.log('123')
        // e.preventDefault();
        // onSubmit({...form, price: +form.price });
    };


    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm(prevState => {
            return {...prevState, [name]: value};
        });
    };
console.log(form);

    return (

        <form
            autoComplete="off"
            // onSubmit={submitFormHandler}
        >

            <Grid container marginTop={10} size={12} direction="column" spacing={2}>
                <Grid size={8} margin={'auto'}>
                    <TextField fullWidth
                        multiline  rows={4}
                        id="decoced"
                        label="Decoded message"
                        value={form.decoded}
                        onChange={inputChangeHandler}
                        name="decoded"
                    />
                </Grid>
                <Grid container size={8} spacing={3} direction={"row"} margin={'auto'}>
                    <Grid size={8} textAlign={'left'} >
                    <TextField
                        fullWidth
                        id="price" label="Password"
                        value={form.password}
                        onChange={inputChangeHandler}
                        name="password"
                    />  </Grid>
                        <Button type={'button'} style={{padding:'0'}} onClick={clickEncode} > <ArrowDownwardIcon fontSize="large"  />
                        </Button>
                        <Button type={'button'} ><ArrowUpwardIcon fontSize="large" />
                        </Button>

                </Grid>

                <Grid size={8}  margin={'auto'}>
                    <TextField fullWidth
                               multiline rows={4}
                        id="encoded" label="Encoded message"
                        value={form.encoded}
                        onChange={inputChangeHandler}
                        name="encoded"
                    />
                </Grid>
            </Grid>

        </form>

    );

};



export default ProductForm;