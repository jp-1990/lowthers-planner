import React, {useState} from 'react'
import classes from './CustomerCreate.module.scss'

const CustomerCreate = ({setModalState}) => {
  const [address, setAddress] = useState({addressLine1:'',
                                          addressLine2:'',
                                          town:'',
                                          county:'',
                                          postcode:''})
  
  const [contact, setContact] = useState({home:'',
                                          mobile:'',
                                          email:''})

  const [frequency, setFrequency] = useState({frequency:''})

  const [contract, setContract] = useState({contractDetails:''})

  console.log(address, contact,frequency,contract);
  
  // address input handler
  const handleAddressInput=(event, target)=>{
    const value=event.target.value
    setAddress(prev=>{
      return {...prev, [target]:value}
    })
  }

  // contact details input handler
  const handleContactInput=(event, target)=>{
    const value=event.target.value
    setContact(prev=>{
      return {...prev, [target]:value}
    })
  }

  // frequency of visits input handler
  const handleFrequencyInput=(event,target)=>{
    const value = event.target.value.replace(/\D/g,'')
    setFrequency(prev=>{
      return {...prev, [target]:value}
    })
  }

  // details of contract input handler
  const handleContractInput=(event,target)=>{
    const value = event.target.value
    setContract(prev=>{
      return {...prev, [target]:value}
    })
  }

  // create new customer handler
  const createNewCustomerHandler=()=>{
    console.log('created customer');
  }

  // jsx for address entry
  const addressJsx=(
    <div className={classes.infoBox} style={{backgroundColor:'white'}}>
      <div className={classes.titleRow}>
        <h6 className={classes.title}>Address</h6>
      </div>
      <i onClick={()=>setModalState(prev=>!prev)} className='material-icons'>clear</i>
        <div className={classes.edit}>
          <input placeholder='Address line 1...' value={address.addressLine1} onChange={(e)=>handleAddressInput(e,'addressLine1')}></input>  
          <input placeholder='Address line 2...' value={address.addressLine2} onChange={(e)=>handleAddressInput(e,'addressLine2')}></input>  
          <input placeholder='Town...' value={address.town} onChange={(e)=>handleAddressInput(e,'town')}></input>  
          <input placeholder='County...' value={address.county} onChange={(e)=>handleAddressInput(e,'county')}></input>  
          <input placeholder='Post code...' value={address.postcode} onChange={(e)=>handleAddressInput(e,'postcode')}></input>
        </div>
    </div>
  )

  // jsx for contact details entry
  const contactJsx=(
    <div className={classes.infoBox} style={{backgroundColor:'white'}}>
      <div className={classes.titleRow}>
        <h6 className={classes.title}>Contact</h6>
      </div>
      <div className={classes.edit}>
          <input placeholder='Home number...' value={contact.home} onChange={(e)=>handleContactInput(e,'home')}></input>  
          <input placeholder='Mobile number...' value={contact.mobile} onChange={(e)=>handleContactInput(e,'mobile')}></input> 
          <input placeholder='Email address...' value={contact.email} onChange={(e)=>handleContactInput(e,'email')}></input>  
        </div>
    </div>
  )
  
  // jsx for visit frequency entry
  const frequencyJsx=(
    <div className={classes.infoBox} style={{backgroundColor:'white'}}>
      <div className={classes.titleRow}>
        <h6 className={classes.title}>Visit frequency</h6>
      </div>
      <div className={classes.edit}>
        <input placeholder='Visit frequency in days...' value={frequency.frequency} onChange={(e)=>handleFrequencyInput(e,'frequency')}></input>    
      </div>
    </div>
  )

  // jsx for contract entry
  const contractJsx=(
    <div className={classes.infoBox} style={{backgroundColor:'white'}}>
      <div className={classes.titleRow}>
        <h6 className={classes.title}>Contract Details</h6>
      </div>
      <div className={classes.edit}>
        <textarea value={contract.contractDetails} onChange={(e)=>handleContractInput(e,'contractDetails')}></textarea>  
        </div>
    </div>
  )

  return (
    <div className={classes.container}>
        <h4>Create new customer</h4>
        <div className={classes.createTitle}>
          <h5>Name</h5>
          <input placeholder='Customer name...'></input>
        </div>
        <div className={classes.details}>
          <div className={classes.contactDetails}>
            {addressJsx}
            {contactJsx}
          </div>
          <div className={classes.contractDetails}>
            {frequencyJsx}
            {contractJsx}
          </div>
        </div>
        <div className={classes.createOptions}>
          <span onClick={createNewCustomerHandler} className={classes.create}>create new customer</span>
          <span onClick={()=>setModalState(prev=>!prev)} className={classes.cancelCreate}>cancel</span>
        </div>
    </div>
  )
}

export default CustomerCreate