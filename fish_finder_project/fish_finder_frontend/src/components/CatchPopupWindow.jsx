import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';

function CatchPopupWindow({product, onInputChange, onSeasonChange}) {

    const inputField = (category, title, value, type) => {
        return (
            <div className="field col-13 md:col-13">
                <label htmlFor={category}>{title}</label>
                <InputText id={category} onChange={(e) => onInputChange(e, category)} value={value} type={type} />
            </div>
        )
    }

    const radioButton = (inputId, name, value, checked) => {
        return (
            <div className="field-radiobutton col-6">
                <RadioButton inputId={inputId} name={name} value={value} onChange={(e) => onSeasonChange(e)} checked={checked} />
                <label htmlFor="spring">{value}</label>
            </div>
        )
    }

    return (
        <div className="p-fluid">
            <div className="date">
                <div className="field col-13 md:col-13">
                    <label htmlFor="basic">Date</label>
                    <Calendar id="basic" onChange={(e) => onInputChange(e, 'date')} dateFormat="mm-dd-yy" value={product.date} showButtonBar />
                </div>
            </div>
            {inputField("fishing_method", "Fishing Method", product.fishing_method, "text")}
            {inputField("length", "Length", product.length, "number")}
            <div className="field">
                <label className="mb-3">Season</label>
                <div className="formgrid grid">
                    {radioButton("spring", "spring", "Spring", (product.season === 'Spring'))}
                    {radioButton("summer", "summer", "Summer", (product.season === 'Summer'))}
                    {radioButton("fall", "fall", "Fall", (product.season === 'Fall'))}
                    {radioButton("winter", "winter", "Winter", (product.season === 'Winter'))}
                </div>
            </div>
            {inputField("species", "Species", product.species, "text")}
            {inputField("weight", "Weight", product.weight, "number")}
            <div>
                <label htmlFor="notes">Field Notes</label>
                <InputTextarea value={product.notes} onChange={(e) => onInputChange(e, 'notes')} rows={2} cols={30} autoResize />
            </div>
        </div>
    )
}

export default CatchPopupWindow