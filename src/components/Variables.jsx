import React, { useState } from 'react';

export default function Variables() {

    const varItemsYesNo = [
        {
            text: 'CHF history',
            name: 'chf'
        },
        {
            text: 'Hypertension history',
            name: 'htn'
        },
        {
            text: 'Stroke/TIA/Thromboembolism history',
            name: 'stroke'
        },
        {
            text: 'Vascular disease history (prior MI, peripheral artery disease, or aortic plaque)',
            name: 'vasc'
        },
        {
            text: 'Diabetes history',
            name: 'diabetes'
        },
    ]

    const risk_mapping = {
        0: {
            risk_amount: 'LOW',
            anticoag: 'may not require',
        },
        1: {
            risk_amount: 'LOW-MODERATE',
            anticoag: 'may require',
        },
        2: {
            risk_amount: 'MODERATE-HIGH',
            anticoag: 'requires',
        },
        3: {
            risk_amount: 'LOW',
            anticoag: 'may not require',
        },
    }

    const [selectedVars, setSelectedVars] = useState({
        age: 0,
        sex: 0,
        chf: 0,
        htn: 0,
        vte: 0,
        vasc_disease: 0,
        diabetes: 0,
    })

    const [risk, updateRisk] = useState(0);

    const [female, updateFemale] = useState(true);

    const [calculateClicked, toggleCalculateClicked] = useState(false);

    const handleCheckedBox = (e) => {
        const { name, value } = e.target

        setSelectedVars(prevState => ({
            ...selectedVars,
            [name]: value,
        }))

        toggleCalculateClicked(false);

    }

    const checkVars = e => {
        e.preventDefault();
        let chadVascScore = Object.values(selectedVars).map(
            (val) => parseInt(val, 10)
        ).reduce(
            (prev, curr) => prev + curr);

        updateRisk(chadVascScore)

        if (selectedVars['sex'] === '1') {
            updateFemale(true)
        } else {
            updateFemale(false)
        }

        toggleCalculateClicked(true);

    }



    function get_risk(risk) {
        let risk_insert = risk;

        if (risk_insert > 2) {
            risk_insert = 2;
        }

        if (risk_insert === 1 && female) {
            return risk_mapping[3]
        }

        return risk_mapping[risk_insert]
    }

    return (

        <div>
            <form>
                <div onChange={handleCheckedBox} className='row py-2 ageRow chadVar'>
                    <div className="col-7 col-lg-4 d-flex flex-sm-column align-items-center align-items-lg-start justify-content-start justify-content-lg-center">
                        <p className='m-0 py-1 text-center'>Age</p>
                    </div>
                    <div className="col d-flex justify-content-end align-items-end">
                        <div className="btn-group row" role="group" aria-label="Basic radio toggle button group">
                            <div className="col px-1">
                                <input type="radio" value="0" className="btn-check" name="age" id="age1" autoComplete="off" defaultChecked />
                                <label className="btn btn-outline-danger" htmlFor="age1">&lt; 65 <span className='score-muted text-end'>0</span></label>
                            </div>
                            <div className="col px-1">
                                <input type="radio" value="1" className="btn-check" name="age" id="age2" autoComplete="off" />
                                <label className="btn btn-outline-danger" htmlFor="age2"> 65 - 74 <span className='score-muted text-end'>+1</span></label>
                            </div>
                            <div className="col px-1">
                                <input type="radio" value="2" className="btn-check" name="age" id="age3" autoComplete="off" />
                                <label className="btn btn-outline-danger" htmlFor="age3">&gt; 75 <span className='score-muted text-end'>+2</span></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div onChange={handleCheckedBox} className='row py-2 sexRow chadVar'>
                    <div className="col-7 col-lg-4 d-flex flex-sm-column align-items-center align-items-lg-start justify-content-start justify-content-lg-center">
                        <p className='m-0 py-1'>Sex</p>
                    </div>
                    <div className="col d-flex justify-content-end align-content-end">
                        <div className="btn-group row" role="group" aria-label="Basic radio toggle button group">
                            <div className="col px-1">
                                <input type="radio" value="0" className="btn-check" name="sex" id="sex1" autoComplete="off" defaultChecked />
                                <label className="btn btn-outline-danger" htmlFor="sex1"> Male <span className='score-muted text-end'>0</span></label>
                            </div>
                            <div className="col px-1">
                                <input type="radio" value="1" className="btn-check" name="sex" id="sex2" autoComplete="off" />
                                <label className="btn btn-outline-danger" htmlFor="sex2">  Female <span className='score-muted text-end'>+1</span></label>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    varItemsYesNo.map(item => {
                        return (
                            <div onChange={handleCheckedBox} key={item.name} className={`row py-2 ${item.name}Row chadVar`}>
                                <div className="col-7 col-lg-4 d-flex flex-sm-column align-items-center align-items-lg-start justify-content-start justify-content-lg-center">
                                    <p className='m-0 py-1'>{item.text}</p>
                                </div>
                                <div className="col d-flex justify-content-end align-content-end">
                                    <div className="btn-group row" role="group" aria-label="Basic radio toggle button group">
                                        <div className="col px-1 d-flex flex-column justify-content-center align-content-end">
                                            <input type="radio" value="0" className="btn-check" name={item.name} id={`${item.name}1`} autoComplete="off" defaultChecked />
                                            <label className="btn btn-outline-danger" htmlFor={`${item.name}1`}> No <span className='score-muted text-end'>0</span></label>
                                        </div>
                                        <div className="col px-1 d-flex flex-column justify-content-center">
                                            <input type="radio" value={item.name === 'stroke' ? '2' : '1'} name={item.name} className="btn-check" id={`${item.name}2`} autoComplete="off" />
                                            <label className="btn btn-outline-danger" htmlFor={`${item.name}2`}> Yes <span className='score-muted text-end'>{item.name === 'stroke' ? '+2' : '+1'}</span></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="row py-3">
                    <div className="col d-flex justify-content-center align-items-center">
                        <button onClick={checkVars} className='calculate-btn btn btn-success w-50 h-100 p-2' type='button'><h3 className='m-0'>Calculate Score</h3></button>
                    </div>
                </div>
            </form>
            
                {calculateClicked &&
                    (<div className='answerBox my-3 p-4 text-center'>
                        <h2>The CHA₂DS₂-VASc score is <span className='risk-number'>{risk}</span> meaning your patient is <b className='risk-number'>{get_risk(risk).risk_amount}</b> risk{(female && risk === 1) ? ' (as they are female)' : undefined}.</h2>

                        <h4>The patient {get_risk(risk).anticoag} anticoagulation.</h4>
                    </div>)
                }
            

        </div>

    )

}