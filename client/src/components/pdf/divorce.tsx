import React from 'react'
import './divorce.css'

export default function Divorce() {
    return (
        <>
            <div className="main" style={{ backgroundColor: 'white', color: 'black' }}>

                <h2 className="text-center" style={{ paddingTop: '100px' }}>Divorce Intake Questionnaire</h2>
                <p className="font-s text-center mt">Personal & Confidential</p>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
                    <img src="/law.png" alt="ByTheLaw" />
                </div>
                <div className="font-s text-center" style={{ marginTop: " 2rem" }}>
                    <label>940 Saratoga Ave</label> <br />
                    <label>Suite 112</label><br />
                    <label>San Jose, CA</label>
                </div>

                <p style={{ pageBreakAfter: 'always' }}></p>
                <p style={{ pageBreakAfter: 'always' }}></p>

                <div style={{ marginTop: "10rem" }}>
                    <p>Referred by: <span className="ml"><input type="text" /></span></p>
                </div>
                <div className="font-s">
                    <p>Date: <span style={{ marginLeft: "4.7rem" }}><input type="text" /></span></p>
                </div>

                <hr style={{ border: " 1.5px solid black", marginTop: " 4rem", marginBottom: "4rem" }} />
                <br />

                <div className="font-s">
                    <p><b>Client’s Name:</b> <span style={{ marginLeft: " 4.7rem" }}><input style={{ width: "43rem" }} type="text" /></span>
                    </p>
                    <div style={{ display: " flex", justifyContent: " space-between", marginLeft: " 18rem", width: " 50%" }}>
                        <div>(Last)</div>
                        <div>(First)</div>
                        <div>(Maiden)</div>
                    </div>
                </div>
                <div className="font-s">
                    <p>Address:<span style={{ marginLeft: " 8.4rem" }}><input style={{ width: "43rem" }} type="text" /></span></p>

                </div>
                <br />

                <div className="font-s" style={{ display: "flex", justifyContent: "space-between", width: "70%" }}>
                    <div>Phone: </div>
                    <div>
                        <div>Home: <input type="text" /></div>
                        <div>Cell: <input type="text" /></div>
                    </div>
                    <div>
                        <div>Work: <input type="text" /></div>
                        <div>Fax: <input type="text" /></div>
                    </div>
                </div>
                <br />

                <div className="font-s mt">
                    Email Address: <input style={{ width: "43rem" }} type="text" />
                </div>
                <br />
                <br />
                <div className="font-s ">
                    Address Where Correspondence Should Be Sent: <input className="ml" type="checkbox" name="" id="" /> Home <input
                        className="ml" type="checkbox" name="" id="" /> Work
                </div>
                <br />
                <br />

                <div className="font-s ">
                    Emloyer: <input style={{ width: "43rem" }} type="text" />
                </div>
                <br />
                <br />

                <div className="font-s">
                    Position: <input style={{ width: "25rem" }} type="text" /> Years Employed: <input style={{ width: "25rem" }}
                        type="text" />
                </div>
                <br />
                <br />

                <div className="font-s">
                    Salary: <span style={{ marginLeft: "6rem" }}>Gross: <input type="text" /></span> <span className="ml">Net:<input
                        type="text" />annual/monthly/ weekly</span>
                </div>
                <br />
                <br />

                <div className="font-s">
                    Social Security No.<input type="text " style={{ width: "22rem" }} className="18rem" />Place of Birth: <input
                        type="text" style={{ width: "22rem" }} className="18rem" />
                </div>
                <br />
                <br />

                <div className="font-s">
                    DOB: <input type="text" style={{ width: "24rem" }} /> AGE: <input type="text" style={{ width: "30rem" }} />
                </div>
                <br />
                <br />

                <div className="font-s" style={{ display: " flex" }}>
                    <div>Education or Training:</div>
                    <div className="ml">
                        <input type="checkbox" name="" id="" /> High School <input type="text" style={{ width: "35rem" }} /><br />
                        <input type="checkbox" name="" id="" /> College <input type="text"
                            style={{ width: "38rem", marginTop: "20px" }} /><br />
                        <input type="checkbox" name="" id="" /> Graduate School <input type="text"
                            style={{ width: "32rem", marginTop: "20px" }} />
                    </div>
                </div>
                <br />
                <br />

                <div className="font-s">Status of</div>
                <div className="font-s" style={{ marginTop: "0.5rem" }}>
                    Health and Treating Physician <input type="text" style={{ width: "40rem" }} /></div>

                <hr style={{ border: "1.5px solid black", marginTop: "4rem" }} />
                <br />

                <p style={{ pageBreakAfter: "always" }}></p>
                <p style={{ pageBreakBefore: "always" }}></p>

                <div style={{ marginTop: "20px" }}>
                    <p><b>Spouse’s Name:</b> <span style={{ marginLeft: " 4.7rem" }}><input style={{ width: "43rem" }} type="text" /></span>
                    </p>
                    <div style={{ display: "flex", justifyContent: " space-between", marginLeft: "18rem", width: "50%" }}>
                        <div>(Last)</div>
                        <div>(First)</div>
                        <div>(Maiden)</div>
                    </div>

                    <div>
                        <p>Address:<span style={{ marginLeft: "8.4rem" }}><input style={{ width: "43rem" }} type="text" /></span></p>
                        <div style={{ marginLeft: " 18rem" }}>(if different)</div>
                    </div>

                    <div>
                        <p>Phone: <span style={{ marginLeft: "8.4rem" }} /></p>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>

                                <div>Home: <input type="text" /></div>
                                <div>Work: <input type="text" /></div>
                            </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>

                                <div>Cell: <input type="text" /></div>
                                <div>Fax: <input type="text" /></div>
                            </p>
                        </div>

                    </div>

                    <div className="mt">Email Address: <input type="text" style={{ width: "40rem" }} /></div>

                    <div className="mt">
                        Address Where Correspondence Should Be Sent: <input className="ml" style={{ width: " 18px", height: "18px" }}
                            type="checkbox" name="" id="" /> Home <input className="ml" style={{ width: " 18px", height: "18px" }}
                                type="checkbox" name="" id="" /> Work <input className="ml" style={{ width: " 18px", height: "18px" }}
                                    type="checkbox" name="" id="" /> Attorney

                    </div>

                    <div className="mt">
                        <p>Spouse's Emloyer: <input style={{ width: "43rem" }} type="text" /></p>
                    </div>

                    <div className="mt">
                        <p>Position: <input style={{ width: "22rem" }} type="text" /> Years Employed: <input style={{ width: "22rem" }}
                            type="text" /></p>
                    </div>

                    <div className="mt">
                        <p>Salary: <span style={{ marginLeft: " 6rem" }}>Gross: <input type="text" /></span> <span
                            className="ml">Net:<input type="text" />annual/monthly/ weekly</span></p>
                    </div>

                    <div className="mt">
                        <p>Social Security No.<input type="text " style={{ width: "22rem" }} className="18rem" />Place of Birth: <input
                            type="text" style={{ width: "22rem" }} className="18rem" /></p>
                    </div>

                    <div className="mt">
                        <p>DOB: <input type="text" style={{ width: "24rem" }} /> AGE: <input type="text" style={{ width: "30rem" }} /></p>
                    </div>

                    <div className="mt">
                        <p>Education or Training:</p>
                        <div className="ml">
                            <input type="checkbox" name="" id="" /> High School <input type="text" style={{ width: "35rem" }} /><br />
                            <input type="checkbox" name="" id="" /> College <input type="text"
                                style={{ width: "38rem", marginTop: "20px" }} /><br />
                            <input type="checkbox" name="" id="" /> Graduate School <input type="text"
                                style={{ width: "32rem", marginTop: "20px" }} />
                        </div>
                    </div>

                    <div className="mt">
                        <p>Status of</p>
                        <p>Health and Treating Physician <input type="text" style={{ width: "40rem" }} /></p>
                    </div>
                    <hr style={{ border: " 1.5px solid black", marginTop: "4rem" }} />
                    <br />
                    <div className="mt">
                        <p>Previous Marriage: Client: <input type="text" style={{ width: "22rem" }} /> Spouse: <input type="text"
                            style={{ width: "22rem" }} /></p>
                    </div>

                    <div className="mt">
                        <p>How and When Ended:</p>
                        <p style={{ marginLeft: "10rem" }} className="mt">Client: <input type="text" style={{ width: "40rem" }} /></p>
                        <p style={{ marginLeft: "10rem" }} className="mt">Spouse: <input type="text" style={{ width: "40rem" }} /></p>
                    </div>

                    <p style={{ pageBreakAfter: "always" }}></p>
                    <p style={{ pageBreakBefore: "always" }}></p>

                    <div className="mt">
                        <b>Children of Client:</b>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p style={{ marginLeft: "2rem" }} className="mt">Name: <br /> <input type="text" style={{ width: "15rem" }} />
                                <br /> <input type="text" className="mt" style={{ width: "15rem" }} /> <br /> <input type="text" className="mt"
                                    style={{ width: "15rem" }} />
                            </p>
                            <p style={{ marginLeft: "5rem" }} className="mt">DOB: <br /> <input type="text" style={{ width: "15rem" }} /> <input
                                type="text" className="mt" style={{ width: "15rem" }} /> <br /> <input type="text" className="mt"
                                    style={{ width: "15rem" }} /></p>
                            <p style={{ marginLeft: "5rem" }} className="mt">SSN: <br /> <input type="text" style={{ width: "15rem" }} /> <input
                                type="text" className="mt" style={{ width: "15rem" }} /> <input type="text" className="mt"
                                    style={{ width: "15rem" }} /></p>
                        </div>
                    </div>

                    <div className="mt">

                        <b>Children of Spouse:</b>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p style={{ marginLeft: "2rem" }} className="mt">Name: <br /> <input type="text" style={{ width: "15rem" }} />
                                <br /> <input type="text" className="mt" style={{ width: "15rem" }} /> <br /> <input type="text" className="mt"
                                    style={{ width: "15rem" }} />
                            </p>
                            <p style={{ marginLeft: "5rem" }} className="mt">DOB: <br /> <input type="text" style={{ width: "15rem" }} /> <input
                                type="text" className="mt" style={{ width: "15rem" }} /> <br /> <input type="text" className="mt"
                                    style={{ width: "15rem" }} /></p>
                            <p style={{ marginLeft: "5rem" }} className="mt">SSN: <br /> <input type="text" style={{ width: "15rem" }} /> <input
                                type="text" className="mt" style={{ width: "15rem" }} /> <input type="text" className="mt"
                                    style={{ width: "15rem" }} /></p>
                        </div>

                    </div>
                    <hr style={{ border: "1.5px solid black", marginTop: "4rem" }} />
                    <br />

                    <div className="mt">
                        <p> <b>This Marriage:</b>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <p>Date: <input type="text" style={{ width: "22rem" }} /></p>
                                <p> Place: <input type="text" style={{ width: "22rem" }} /></p>
                            </div>
                        </p>
                    </div>
                    <div style={{ marginLeft: "8rem" }}>Registered: <input type="text" style={{ width: "45rem" }} /></div>

                    <div className="mt">

                        <b>Children:</b>
                        <div style={{ display: "flex", justifyContent: " space-between" }}>
                            <p style={{ marginLeft: "2rem" }} className="mt">Name: <br /> <input type="text" style={{ width: "15rem" }} />
                                <br /> <input type="text" className="mt" style={{ width: "15rem" }} /> <br /> <input type="text" className="mt"
                                    style={{ width: "15rem" }} />
                            </p>
                            <p style={{ marginLeft: "5rem" }} className="mt">DOB: <br /> <input type="text" style={{ width: "15rem" }} /> <input
                                type="text" className="mt" style={{ width: "15rem" }} /> <br /> <input type="text" className="mt"
                                    style={{ width: "15rem" }} /></p>
                            <p style={{ marginLeft: "5rem" }} className="mt">Lives With: <br /> <input type="text" style={{ width: "15rem" }} />
                                <input type="text" className="mt" style={{ width: "15rem" }} /> <input type="text" className="mt"
                                    style={{ width: "15rem" }} />
                            </p>
                        </div>

                    </div>

                    <div className="mt" style={{ marginLeft: "10rem" }}>

                        <p>Currently pregnant? Y / N</p>
                        <p>Special Problems With Children? <input type="text" style={{ width: "30rem" }} /></p>

                    </div>

                    <div className="mt">
                        <p>Spouse’s Attorney: <input type="text" style={{ width: "30rem" }} /></p>
                        <p style={{ marginLeft: "11rem" }}><input type="text" style={{ width: "30rem" }} /></p>
                        <p style={{ marginLeft: "11rem" }}><input type="text" style={{ width: "30rem" }} /></p>
                    </div>

                    <p className="mt" style={{ marginLeft: "4rem" }}>Previous Divorce Actions Commenced Against Present Spouse</p>

                    <div className="mt" style={{ marginLeft: "4rem" }}>

                        <p>When: <input type="text" style={{ width: "20rem" }} /> Where: <input type="text" style={{ width: "20rem" }} /></p>

                    </div>

                    <hr style={{ border: "1.5px solid black", marginTop: "4rem" }} />

                    <div className="mt">

                        <p>How Terminated: <input type="text" style={{ width: "36rem" }} /></p>
                    </div>


                    <div className="mt">

                        <p> <b>Grounds:</b>
                            <div className="mt" style={{ display: "flex", justifyContent: "space-around" }}>
                                <p>Mental</p>
                                <p>Adultery</p>
                                <p>Drunkenness</p>
                                <p>Physical</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <p>Desertion</p>
                                <p>Other <input type="text" /></p>
                                <p>irreconcilable Differences</p>
                            </div>
                        </p>

                    </div>

                    <div className="mt" style={{ marginLeft: "10rem" }}>

                        <p>Comments:</p>
                        <p className="mt"><input type="text" style={{ width: "45rem" }} /></p>
                        <p className="mt"><input type="text" style={{ width: "45rem" }} /></p>
                        <p className="mt"><input type="text" style={{ width: "45rem" }} /></p>
                    </div>

                    <div className="mt" style={{ display: "flex", justifyContent: "space-around" }}>
                        <p>Fee Agreement:</p>
                        <p>Retainer</p>
                        <p>Hourly Rate</p>
                        <p>Minimum</p>
                        <p>Other</p>
                    </div>

                    <div className="mt">
                        <b>ASSETS:</b>
                        <p className="mt" style={{ textDecoration: "underline" }}>Martial Residence</p>
                        <p className="mt">Address: <input type="text" style={{ width: "30rem" }} /> </p>
                        <p className="mt">Title in whose name(s)? <input type="text" style={{ width: "30rem" }} /> </p>
                        <p className="mt">Location of title papers: <input type="text" style={{ width: "30rem" }} /> </p>
                        <p className="mt">Who made down payment: <input type="text" style={{ width: "30rem" }} /> </p>
                        <p className="mt">Are payments current?<input type="text" style={{ width: "30rem" }} /></p>
                        <p className="mt">Who makes payments?<input type="text" style={{ width: "30rem" }} /></p>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>When Purchaged: <input type="text" style={{ width: "20rem" }} /></p>
                            <p>Price Paid: <input type="text" style={{ width: "20rem" }} /></p>
                        </div>
                        <div className="mt" style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Mortgage payments: <input type="text" style={{ width: "18rem" }} /></p>
                            <p>Approximate yearly taxes: <input type="text" style={{ width: "18rem" }} /></p>
                        </div>
                        <p style={{ marginLeft: "10rem" }}>(1) Approximate present value: <input type="text" style={{ width: "30rem" }} /></p>
                        <p style={{ marginLeft: "10rem" }}>(2) Mortgage balance as of: <input type="text"
                            style={{ width: "15rem" }} />:<input type="text" style={{ width: "15rem" }} /></p>
                        <p style={{ marginLeft: "15rem" }}>Estimated Net Value:$ <input type="text" style={{ width: "15rem" }} /><b
                            style={{ marginLeft: "4rem", textDecoration: "underline" }}>Other</b></p>
                    </div>

                    <div className="mt"> <b style={{ textDecoration: "underline" }}>Real Estate:</b>
                        <p>Address:<input type="text" style={{ width: "38rem" }} /></p>
                        <p>Location of title papers:<input type="text" style={{ width: "30rem" }} /></p>
                    </div>

                    <p style={{ pageBreakAfter: "always" }}></p>
                    <p style={{ pageBreakBefore: "always" }}></p>

                    <p className="mt">Who made the down payment:<input type="text" style={{ width: "35rem" }} /></p>
                    <p className="mt">Who holds mortgage:<input type="text" style={{ width: "35rem" }} /></p>
                    <p className="mt">Are payments current?<input type="text" style={{ width: "35rem" }} /></p>
                    <p className="mt">Who makes payments:<input type="text" style={{ width: "35rem" }} /></p>
                    <div>
                        <p style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <p>Mortgage payments:<input type="text" style={{ width: "20rem" }} /></p>
                            </div>
                            <div>
                                <p>Approximate yearly taxes:<input type="text" style={{ width: "20rem" }} /></p>
                            </div>
                        </p>
                        <p style={{ marginLeft: "10rem" }}>(1) Approximate present value:<input type="text" style={{ width: "30rem" }} /></p>
                        <p style={{ marginLeft: "10rem" }}>(2) Mortgage balance as of:<input type="text" style={{ width: "15rem" }} />:<input
                            type="text" style={{ width: "15rem" }} /></p>
                    </div>
                </div>

                <p>If applicable:</p>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <p>Gross monthly income: <input type="text" style={{ width: "18rem" }} /></p>
                    <p>Net monthly income: <input type="text" style={{ width: "18rem" }} /></p>
                </div>
                <p>Can you furnish an Income-Expense Statement?<input type="text" style={{ width: "30rem" }} /></p>
                <p style={{ marginLeft: "20rem" }}>Estimated Net Value:$ <input type="text" style={{ width: "20rem" }} /></p>

                <p className="mt" style={{ borderBottom: "1px solid black" }}>Automobiles</p>

                <div className="mt">
                    <p>Year and Model: <input type="text" style={{ width: "30rem" }} /> Name</p>
                    <p>on Title: <input type="text" style={{ width: "26rem" }} />Who has</p>
                    <p>possession: <input type="text" style={{ width: "32rem" }} /></p>
                    <p>Who holds lien: <input type="text" style={{ width: "30rem" }} /></p>
                    <p>Payments per month: <input type="text" style={{ width: "30rem" }} /> Who</p>
                    <p>is making payments: <input type="text" style={{ width: "30rem" }} /></p>
                    <p style={{ marginLeft: "10rem" }}>(1) Approximate present value: <input type="text" style={{ width: "30rem" }} /></p>
                </div>

                <p style={{ pageBreakAfter: "always" }}></p>
                <p style={{ pageBreakBefore: "always" }}></p>

                <p style={{ marginLeft: "10rem" }}>(1) Balance owing on lien as of: <input type="text"
                    style={{ width: "18rem" }} />:$<input type="text" style={{ width: "18rem" }} /></p>
                <p style={{ marginLeft: "20rem" }}>Estimated Net Value:$ <input type="text" style={{ width: "20rem" }} /></p>

                <div className="mt">
                    <b style={{ borderBottom: "1px solid black", width: "11rem" }}>Stocks and Bonds</b>
                    <p>Ammount,type,company: <input type="text" style={{ width: "25rem" }} /> Location: <input type="text"
                        style={{ width: "14rem" }} /></p>
                    <p>Named Owner: <input type="text" style={{ width: "20rem" }} /> Value as of <input type="number"
                        style={{ width: "10rem" }} />:$<input type="number" style={{ width: "10rem" }} /></p>

                    <p className="mt">Amount,type,company: <input type="text" style={{ width: "20rem" }} />Location: <input type="text"
                        style={{ width: "15rem" }} /></p>
                    <p>Named Owner: <input type="text" style={{ width: "20rem" }} />Value as of <input type="number"
                        style={{ width: "14rem" }} />:$ <input type="text" style={{ width: "10rem" }} /></p>

                    <p className="mt">Amount,type,company: <input type="text" style={{ width: "20rem" }} />Location: <input type="text"
                        style={{ width: "15rem" }} /></p>
                    <p>Named Owner: <input type="text" style={{ width: "20rem" }} />Value as of <input type="number"
                        style={{ width: "14rem" }} />:$ <input type="text" style={{ width: "10rem" }} /></p>
                    <p>Amount,type,company: <input type="text" style={{ width: "20rem" }} />Location: <input type="text"
                        style={{ width: "15rem" }} /></p>

                    <p>Named Owner: <input type="text" style={{ width: "20rem" }} />Value as of <input type="number"
                        style={{ width: "14rem" }} />:$ <input type="text" style={{ width: "10rem" }} /></p>

                    <div className="mt">

                        <b style={{ borderBottom: " 1px solid black", width: "11rem" }}>Insurance Policies</b>
                        <p>Company: <input type="text" style={{ width: "30rem" }} /></p>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Policy Number: <input type="number" style={{ width: "18rem" }} /></p>
                            <p>Face Amount: <input type="number" style={{ width: "18rem" }} /></p>

                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Premiums: <input type="text" style={{ width: "18rem" }} /></p>
                            <p>per: <input type="number" style={{ width: "18rem" }} /></p>
                        </div>

                        <div style={{ display: "flex", justifyContent: " space-between" }}>
                            <p>Owner- <input type="text" style={{ width: "18rem" }} /></p>
                            <p>Beneficiary: <input type="number" style={{ width: "18rem" }} /></p>
                        </div>
                        <p>Cash Value:$ <input type="text" style={{ width: "25rem" }} /></p>

                    </div>

                </div>

                <div className="mt">
                    <b style={{ width: "11rem", borderBottom: "1px solid black" }}>Safe Deposit Box:</b>
                    <p>Location: <input type="text" style={{ width: "40rem" }} /></p>
                    <p>Names on box: <input type="text" style={{ width: "40rem" }} /></p>
                    <p>Who has the key? <input type="text" style={{ width: "40rem" }} /></p>
                    <p>Contents: <input type="text" style={{ width: "40rem" }} /></p>
                </div>

                <p style={{ pageBreakAfter: "always" }}></p>
                <p style={{ pageBreakBefore: "always" }}></p>


                <div className="mt">
                    <b style={{ width: "11rem", borderBottom: "2px solid black" }}>Bank Accounts</b>
                    <p>Location: <input type="text" style={{ width: "20rem" }} /> Balance as of <input type="text"
                        style={{ width: "15rem" }} />:$ <input type="text" style={{ width: "15rem" }} /></p>
                    <p>In Whose Name: <input type="text" style={{ width: "40rem" }} /></p>
                    <p>Who Has Passbook: <input type="text" style={{ width: "40rem" }} /></p>
                    <p>Type of Account: <input type="text" style={{ width: "40rem" }} /></p>
                    <p>How Funds Acquired: <input type="text" style={{ width: "40rem" }} /></p>

                    <p className="mt">Location: <input type="text" style={{ width: "20rem" }} /> Balance as of <input type="text"
                        style={{ width: "15rem" }} />:$ <input type="text" style={{ width: "15rem" }} /></p>
                    <p>In Whose Name: <input type="text" style={{ width: "40rem" }} /></p>
                    <p>Who Has Passbook: <input type="text" style={{ width: "40rem" }} /></p>
                    <p>Type of Account: <input type="text" style={{ width: "40rem" }} /></p>
                    <p>How Funds Acquired: <input type="text" style={{ width: "40rem" }} /></p>
                </div>

                <div className="mt">
                    <b style={{ borderBottom: "1px solid black", width: "15rem" }}>Other Assets in Possession of Client</b>

                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div>
                            <p style={{ textAlign: "center" }}>Description</p>
                            <input type="text" style={{ width: "25rem" }} /> <br />
                            <input className="mt" type="text" style={{ width: "25rem" }} />
                        </div>
                        <div style={{ marginLeft: "50px" }}>
                            <p style={{ textAlign: "center" }}>Estimated Value</p>
                            <input type="text" style={{ width: "25rem" }} /> <br />
                            <input className="mt" type="text" style={{ width: "25rem" }} />
                        </div>
                    </div>
                </div>

                <div className="mt">
                    <b style={{ borderBottom: "1px solid black", width: "15rem" }}>Client's Non-Marital Property</b>

                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div>
                            <p style={{ textAlign: "center" }}>Description</p>
                            <input type="text" style={{ width: "25rem" }} /> <br />
                            <input className="mt" type="text" style={{ width: "25rem" }} />
                        </div>
                        <div style={{ marginLeft: "50px" }}>
                            <p style={{ textAlign: "center" }}>Estimated Value</p>
                            <input type="text" style={{ width: "25rem" }} /> <br />
                            <input className="mt" type="text" style={{ width: "25rem" }} />
                        </div>
                    </div>
                </div>

                <div className="mt">
                    <b style={{ borderBottom: "1px solid black", width: "11rem" }}>Pension Plans</b>

                    <div style={{ display: "flex", justifyContent: "center", alignItems: " center" }}>
                        <div>
                            <input type="text" className="mt" style={{ width: "25rem" }} /> <br />
                            <input className="mt" type="text" style={{ width: "25rem" }} />
                        </div>
                        <div style={{ marginLeft: "50px" }}>
                            <input type="text" style={{ width: "25rem" }} /> <br />
                            <input className="mt" type="text" style={{ width: "25rem" }} />
                        </div>
                    </div>
                </div>

                <hr style={{ border: " 1.5px solid black", marginTop: "4rem" }} />
                <p style={{ pageBreakAfter: "always" }}></p>
                <p style={{ pageBreakBefore: "always" }}></p>

                <div className="mt">
                    <b>LIABILITIES</b>
                    <p className="mt" style={{ textDecoration: "underline", width: "14rem" }}>Credit Card Debt</p>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <p>To Whom Owed</p>
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                        </div>

                        <div>
                            <p>For What?</p>
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                        </div>

                        <div>
                            <p>Monthly Payment</p>
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                        </div>

                        <div>
                            <p>Balance as of...</p>
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                        </div>

                    </div>

                    <p className="mt" style={{ textDecoration: "underline", width: "11rem" }}>Personal Loans:</p>
                    <div style={{ display: "flex", justifyContent: " space-between" }}>
                        <div>
                            <p>To Whom Owed</p>
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                        </div>

                        <div>
                            <p>For What?</p>
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                        </div>

                        <div>
                            <p>Monthly Payment</p>
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                        </div>

                        <div>
                            <p>Balance as of...</p>
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                        </div>

                    </div>

                    <p className="mt" style={{ textDecoration: "underline", width: "12rem" }}>Automobile Loans:</p>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <p>To Whom Owed</p>
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                        </div>

                        <div>
                            <p>For What?</p>
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                        </div>

                        <div>
                            <p>Monthly Payment</p>
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                        </div>

                        <div>
                            <p>Balance as of...</p>
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />
                            <input type="text" style={{ width: "13rem" }} className="mt" />

                        </div>

                    </div>
                </div>
                <p className="mt" style={{ textDecoration: "underline", width: "30rem" }}>Mortgage Loans (Second Mortgage if
                    Applicable)</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <p>To Whom Owed</p>
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                    </div>

                    <div>
                        <p>For What?</p>
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                    </div>

                    <div>
                        <p>Monthly Payment</p>
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                    </div>

                    <div>
                        <p>Balance as of...</p>
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                    </div>

                </div>

                <p style={{ pageBreakAfter: "always" }}></p>
                <p style={{ pageBreakBefore: "always" }}></p>

                <p className="mt" style={{ textDecoration: "underline", width: "10rem" }}>Other Debt:</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <p>To Whom Owed</p>
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                    </div>

                    <div>
                        <p>For What?</p>
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                    </div>

                    <div>
                        <p>Monthly Payment</p>
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                    </div>

                    <div>
                        <p>Balance as of...</p>
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                        <input type="text" style={{ width: "13rem" }} className="mt" />
                    </div>

                </div>

                <p style={{ marginLeft: "20rem" }} className="mt">Total: <input type="text" style={{ width: "15rem" }} /> <input
                    type="text" style={{ width: "15rem", marginLeft: "40px" }} /></p>


                <p style={{ pageBreakAfter: "always" }}></p>
                <p style={{ pageBreakBefore: "always" }}></p>

                <hr style={{ border: "1.5px solid black", marginTop: " 4rem" }} />

                <b className="mt">ISSUES TO ADDRESS:</b>

                <div className="mt" style={{ display: " flex", justifyContent: "space-between", width: "70rem" }}>
                    <p>Maiden name restored: </p>
                    <p> Y/N </p>
                    <p> Maiden Name: <input type="text" style={{ width: "20rem" }} /> </p>

                </div>
                <br />
                <div className="mt" style={{ display: "flex", justifyContent: "space-between", width: "40rem" }}>
                    <p>Custody: </p>
                    <p>JOINT</p>
                    <p>H</p>
                    <p>W</p>

                </div>
                <br />
                <div className="mt" style={{ display: " flex", justifyContent: " space-between", width: "40rem" }}>
                    <p>Physical Custody: </p>
                    <p>H</p>
                    <p>W</p>

                </div>
                <br />
                <div className="mt" style={{ display: " flex", justifyContent: " space-between", width: "40rem" }}>
                    <p>Maintenance: </p>
                    <p>Y</p>
                    <p>N</p>
                    <p>how much $ <input type="text" style={{ width: "12rem" }} /></p>

                </div>
                <br />
                <div className="mt" style={{ display: " flex", justifyContent: " space-between" }}>
                    <p>Child Support:   </p>
                    <p>Y</p>
                    <p>N</p>
                    <p>how much $ <input type="text" style={{ width: "12rem" }} />deviate from statute:Y/N</p>

                </div>
                <br />
                <p>Attorney Fees:</p>
                <div className="mt" style={{ display: "flex", justifyContent: "space-between", width: "40rem", marginLeft: "20rem" }}>
                    <p>Interim/Final: </p>
                    <p>H</p>
                    <p>W</p>
                    <p>Each party pays own</p>

                </div>
                <br />
                <div className="mt" style={{ display: "flex", justifyContent: "space-between", width: "40rem", marginLeft: "20rem" }}>
                    <p>Petition for fees?:  </p>
                    <p>Y</p>
                    <p>N</p>

                </div>
                <br />
                <div className="mt" style={{ display: " flex", justifyContent: "space-between" }}>
                    <p>Dissipation: </p>
                    <p>Y</p>
                    <p>N</p>

                </div>
                <br />
                <div className="mt" style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>Exclusive possession of marital residence: </p>
                    <p>Y</p>
                    <p>N</p>
                    <p>for</p>
                    <p>H</p>
                    <p>W</p>

                </div>
                <br />
                <div className="mt" style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>File Counter-Petition: </p>
                    <p>Y</p>
                    <p>N</p>

                </div>

                <hr style={{ border: " 1.5px solid black", marginTop: " 4rem" }} />
                <p style={{ pageBreakAfter: "always" }}></p>
                <p style={{ pageBreakBefore: "always" }}></p>


                <div className="mt" style={{ width: "80%", margin: "auto" }}>

                    <b style={{ textAlign: "center" }} className="mt">SETTLEMENT NOTES</b>
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />

                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                    <br />
                    <input type="text" style={{ width: "60rem" }} className="mt" />
                </div>
                <div style={{ width: '9%', margin: "auto", marginTop: "24px", height: "40px" }}>
                    <button style={{ backgroundColor: " rgb(62, 62, 170)", color: "white", padding: "4px", paddingLeft: "30px", paddingRight: "30px", cursor: "pointer", borderRadius: "30%" }}>Submit</button>
                </div>
            </div>
        </>
    )
};
