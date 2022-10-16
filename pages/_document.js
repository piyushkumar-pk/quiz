import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head />
            <body>
                <div style={{ marginTop: "20px", textAlign: 'center' }}>
                    <h5>Select your language</h5>
                    <div >
                        <div id="google_translate_element"></div>
                    </div>
                </div>

                <Main />
                <NextScript />
            </body>
        </Html>
    )
}