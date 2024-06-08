import React, { useEffect, useState } from "react";
import styles from './TextField.module.css'

import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';

export default function TextField({ label, type, ...props }) {
    const [hidden, setHidden] = useState(true)
    return (
        <div className={styles.input_con}>
            <label>
                <p>{label}</p>

                {type == "password" ?
                    <div className={styles.inputField}>
                        <input type={hidden ? "password" : "text"} {...props} />
                        <button type="button" className={styles.eye} onClick={(e) => { setHidden(!hidden) }}>
                            {hidden ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                        </button>
                    </div>
                    :
                    <div className={styles.inputField}>
                        <input type={type} {...props} />
                    </div>
                }

            </label>
        </div>
    )
}

export function PhoneNumberField({ label, value, countryCode, onChangeCC, ...props }) {
    const [cCodeList, setCCodeList] = useState([])
    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries/codes', {
            method: "get",
        })
            .then(res => res.json())
            .then(Data => {
                setCCodeList(Data.data)
            })
    }, [])

    return (
        <div className={styles.input_con}>
            <label>
                <p>{label}</p>
                <div className={styles.input_wrap}>
                    <div className={styles.inputField} style={{ maxWidth: "120px" }}>
                        <select value={countryCode} onChange={onChangeCC}>
                            {cCodeList.map((e, i) => {
                                return (
                                    <option key={i} value={e.dial_code}> {e.dial_code} {e.name}  </option>
                                )
                            })}
                        </select>
                        <div className={styles.sel_icon} >
                            <UnfoldMoreRoundedIcon />
                        </div>
                    </div>
                    <div className={styles.inputField}>
                        <input type="text" {...props} />
                    </div>


                </div>
            </label>
        </div>
    )
}

export function Select({ label, children, ...props }) {
    return (
        <div className={styles.input_con}>
            <label>
                <p>{label}</p>
                <div className={styles.inputField} >
                    <select {...props}>
                        {children}
                    </select>
                    <div className={styles.sel_icon}>
                        <UnfoldMoreRoundedIcon />
                    </div>
                </div>

            </label >
        </div >
    )
}