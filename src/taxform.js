import { useState } from "react"

    const singleTaxCredit = 1650
    const employeeTaxCredit = 1650
    const twentyPercentBracket = 36800

    let taxCredits = singleTaxCredit + employeeTaxCredit
    let taxableIncome
    let taxPayableAtTwenty = 0
    let taxPayableAtForty = 0 
    let netTaxPayable = 0

function TaxForm() {

    const [paye, setPaye] = useState(0)
    const [pension, setPension] = useState(0)
    const [investments, setInvestments] = useState(0)
    const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {maximumFractionDigits: 0,})
    
    function grossIncome() {
        return ( paye + investments )
    }

    function calcTaxableIncome() {
        taxableIncome = paye + investments - pension
        return taxableIncome
    }
    
    function calcTaxTwentyPercent(twentyPercentBracket, taxableIncome) {
        if ( taxableIncome > 36800) {
            taxPayableAtTwenty = twentyPercentBracket * 0.2
            return taxPayableAtTwenty
        }
        taxPayableAtTwenty = taxableIncome * 0.2
        return taxPayableAtTwenty
    }
    
    function calcTaxFortyPercent(twentyPercentBracket, taxableIncome) {
        if (taxableIncome - twentyPercentBracket < 0) {
        return 0
        }
        taxPayableAtForty = (taxableIncome - twentyPercentBracket) * 0.4
        return taxPayableAtForty
    }

    function calcNetTaxLiabailty(taxPayableAtTwenty, taxPayableAtForty, taxCredits) {
        netTaxPayable = taxPayableAtTwenty + taxPayableAtForty - taxCredits
        if (netTaxPayable < 3300) {
            return 0
        }
        return netTaxPayable
    }

    function calcUSC() {

    }
    // First €12,012	0.5%
    // Next €9,283	2%
    // Next €48,749	4.5%
    // Balance	8%


    return (
        <div className="tax-section pt-5">
            <h2 className="pb-3">Single and Childless by Choice?!<br />Good for you.</h2>
            <p>Need a rough and ready calculation on your tax liability for 2022? Well, let's assume that: </p>
            <ul>
                <li>You're unmarried and child-free (because you're good at dodging bullets)</li>
                <li>You are currently employed as an "A Class employee" for PRSI purposes</li>
                <li>You are actually getting real tax advice or using a more professional calculator like this one</li>

            </ul>

            <div className="tax-grid">
                <label htmlFor="paye-income">Enter your <strong>Gross PAYE Income</strong>:</label>
                    <input className ="form-control" type="number" name="paye-income" id="paye-income" placeholder="PAYE Income" value={ paye } onChange={(e) => setPaye(parseInt(e.target.value))} />
                
    
    
                <label htmlFor="pension-contributions">Enter your <strong>Annual Pension Contributions</strong>:</label> 
                    <input className ="form-control" type="number" name="pension-contributions" id="pension-contributions" placeholder="Pension Contribuations" value={ pension } onChange={(e) => setPension(parseInt(e.target.value))} />
                
    
                <label htmlFor="investment-income">Enter your <strong>Annual Investment Income</strong>:</label>
                    <input className ="form-control" type="number" name="investment-income" id="investment-income" placeholder="Investment Income" value={ investments } onChange={(e) => setInvestments(parseInt(e.target.value))} />
    
                <hr className="span-2" />
    
                {/* <p>Single Person Tax Credit: €{ INTEGER_FORMATTER.format(singleTaxCredit) }</p>
                <p>Employee Tax Credit: €{ INTEGER_FORMATTER.format(employeeTaxCredit) }</p> */}
                <span>Gross Income:</span> <span>€{ INTEGER_FORMATTER.format(grossIncome(paye, investments)) }</span>
                <span>Taxable Income:</span> <span>€{ INTEGER_FORMATTER.format(calcTaxableIncome()) }</span>
                <span>Tax payable at 20%:</span> <span>€{ INTEGER_FORMATTER.format(calcTaxTwentyPercent(twentyPercentBracket, taxableIncome)) }</span>
                <span>Tax payable at 40%:</span> <span>€{ INTEGER_FORMATTER.format(calcTaxFortyPercent(twentyPercentBracket, taxableIncome)) }</span>
                <span>Total tax liability:</span> <span>€{ INTEGER_FORMATTER.format(taxPayableAtTwenty + taxPayableAtForty) }</span>
                <span>Minus personal tax credits:</span> <span>-€{ INTEGER_FORMATTER.format(taxCredits) }</span>
                <span>USC Due:</span> <span>€{ INTEGER_FORMATTER.format(0) } - still working on it hun</span>
                <span>PRSI Due:</span> <span>€{ INTEGER_FORMATTER.format(0) } - still working on it hun</span>
                <span>Net tax liability:</span> <span>€{ INTEGER_FORMATTER.format(calcNetTaxLiabailty(taxPayableAtTwenty, taxPayableAtForty, taxCredits)) }</span>
            </div>
        </div>
        )
    }

export default TaxForm