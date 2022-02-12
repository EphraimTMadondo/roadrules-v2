import Link from 'next/link'
import Button from '@mui/material/Button';
import Image from 'next/image';
import Layout from '../components/layout';
import Head from 'next/head';
import { CustomCenter } from '../components/custom-center';
import { UNIT } from '../lib/units';
import { TextField } from '@mui/material';
import { useState } from 'react';

interface State {
  verificationCode: string;
}

export default function Verify () {

  const [ state, setState ] = useState<State>( {
    verificationCode: ""
  } );

  function handleVerificationCodeChange ( e: any ) {

    setState( prevState => ( {
      ...prevState,
      verificationCode: String( e.target.value )
    } ) );

  }

  return (
    <Layout noScaffolding>

      <Head>
        <title>Road Rules - Verification</title>
      </Head>

      <div className="row center-center">
        <CustomCenter>
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
        </CustomCenter>
      </div>

      <div className="row center-center">
        <CustomCenter>
          <div className="row center-center">
            <CustomCenter>
              <div className="column center-stretch">
                <p style={{ textAlign: "center" }}>
                  Please enter the verification code you received via SMS below and click Verify.
                </p>
                <div className="column center-stretch" style={{ padding: UNIT }}>
                  <TextField
                    variant="outlined"
                    placeholder="Verification Code"
                    value={state.verificationCode}
                    onChange={handleVerificationCodeChange}
                    size="small"
                    id="verificationCode"
                  />
                </div>
                <div className="column center-stretch" style={{ padding: UNIT }}>
                  <Link href="/notes">
                    <Button type="submit" variant="contained" color="primary">
                      Verify
                    </Button>
                  </Link>
                </div>
                <div className="column center-stretch" style={{ padding: UNIT }}>
                  <Link href="/notes">
                    <Button type="button" variant="contained" color="primary">
                      Resend Code
                    </Button>
                  </Link>
                </div>
                <div className="column center-stretch" style={{ padding: UNIT }}>
                  <Link href="/notes">
                    <Button type="button" variant="contained" color="primary">
                      Request Assistance
                    </Button>
                  </Link>
                </div>
              </div>
            </CustomCenter>
          </div>
        </CustomCenter>
      </div>

    </Layout>
  )
}
