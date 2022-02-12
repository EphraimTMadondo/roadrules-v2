import Button from '@mui/material/Button';
import Image from 'next/image';
import Layout from '../components/layout';
import Head from 'next/head';
import { CustomCenter } from '../components/custom-center';
import { UNIT } from '../lib/units';
import { TextField } from '@mui/material';
import { useState } from 'react';

interface State {
  phoneNumber: string;
}

export default function Home () {

  const [ state, setState ] = useState<State>( {
    phoneNumber: ""
  } );

  function handlePhoneNumberChange ( e: any ) {

    setState( prevState => ( {
      ...prevState,
      phoneNumber: String( e.target.value )
    } ) );

  }

  return (
    <Layout noScaffolding>

      <Head>
        <title>Welcome to RoadRules</title>
      </Head>

      <div className="row center-center">
        <CustomCenter>
          <div className="row center-center">
            <div style={{ position: "relative", height: 400, width: "100%", overflow: "hidden" }}>
              <Image
                src="/images/road_rules_logo.png"
                alt="Road Rules Logo"
                layout="fill"
                objectFit="scale-down"
              />
            </div>
          </div>
        </CustomCenter>
      </div>

      <div className="row center-center">
        <CustomCenter>
          <div className="column center-stretch">
            <p style={{ textAlign: "center" }}>
              Please enter your current phone number below and click Send Verification Code, a verification code will be sent to your phone.
            </p>
            <div className="column center-stretch" style={{ padding: UNIT }}>
              <TextField
                variant="outlined"
                placeholder="+263718384668"
                value={state.phoneNumber}
                onChange={handlePhoneNumberChange}
                size="small"
                id="phoneNumber"
              />
            </div>
            <div className="column center-stretch" style={{ padding: UNIT }}>
              <Button type="submit" variant="contained" color="primary">
                Send Verification Code
              </Button>
            </div>
          </div>
        </CustomCenter>
      </div>

    </Layout>
  )
}
