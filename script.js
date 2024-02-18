const main = ReactDOM.createRoot(document.getElementById('main'));

const contactList = [{name:"gold",phone:"123425"},{name:"gal",phone:"123425"},{name:"tal",phone:"454545"},{name:"ron",phone:"2524745"}]


function Contact(p) {
    const [name,setName] = React.useState(p.name)
    const [phone,setPhone] = React.useState(p.phone)
    const [editMode, setEditMode] = React.useState(false)
    return (
        <div className="contact-card" onDoubleClick={()=>{setEditMode(true)}}>
        {editMode? 
        (
        <>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); } } />
            <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value); } } />
            <button onClick={()=>{setEditMode(false)}}>Save</button>
        </>
        )
        :(
        <>
            <div>{name}</div>
            <div>{phone}</div>
            <div className="trashbin" onClick={(e)=>{e.target.parentElement.remove()}}>🗑️</div>
        </>
        )}
        </div>
    )
}


function Contacts(p) {
    const [cList,cListSet] = React.useState(p.clist)
    const [name,setName] = React.useState("")
    const [phone,setPhone] = React.useState("")
    const inputSearchEvent = (query) => {
        query?cListSet(p.clist.filter(i=>i.name.startsWith(query))):cListSet(p.clist);
    }
    const addClickEvent = () => {
        if (name != "" && phone != ""){
            cListSet([...cList,{name:name,phone:phone}]);
            setName("");
            setPhone("")
        }
    }
    return (
        <>
        <input placeholder="search.." onInput={(e)=>{inputSearchEvent(e.target.value)}} />
        <div id="add-contact">
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); } } />
            <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value); } } />
            <button onClick={()=>{addClickEvent()}}>Add</button>
        </div>
        <div id="contacts">
            {cList.map(contact => <Contact name={contact.name} phone={contact.phone} />)}
        </div>
        </>
    )
}




main.render(<Contacts clist={contactList}/>)

