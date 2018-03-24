/**
*
* ChangeOwner
*
*/

import React from 'react';
// import styled from 'styled-components';

import instance from '../../../token/saveToken';
import ethereum_address from 'ethereum-address';
import web3 from '../../../token/web3';
import { Row, Card, Col, Input, Button, Form, Icon, Modal } from "antd";
const FormItem = Form.Item;


class ChangeOwner extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      ownerLoading: false,
      txResp: '',
      newOwnerAddress: '',
      validOwnerAddress: false,
      addressValidateStatus: "",
      addressHelp: "",
      currentDate: '',
      visible: false
    }
    this.timer = this.timer.bind(this);
  }

  componentDidMount () {
    var intervalId = setInterval(this.timer, 1000);
    // store intervalId in the state so it can be accessed later:
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount () {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  timer () {
    // setState method is used to update the state
    this.setState({ currentDate: (new Date()).toString() });
  }


  getBalance = (e) => {
    this.setState({ownerLoading: true, validOwnerAddress: false})
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if(!values) {
        this.setState({validOwnerAddress: false, ownerLoading: false, addressValidateStatus: 'error', addressHelp: 'Address is required!'});
      }
      else if(err) {
        this.setState({validOwnerAddress: false, ownerLoading: false, addressValidateStatus: 'error', addressHelp: 'Invalid Address!'});
      }
      else {
        this.setState({validOwnerAddress: true});
        this.setState({newOwnerAddress: values.address})
        console.log(this.props.token.info.metaMaskAccount, "this.props.token.info.metaMaskAccountBalance", values, "values")

        if(this.props.componentAction == "Owner") {
          const txResp = await instance.methods.transferOwner(values.address).send({from: this.props.token.info.metaMaskAccount, gas: '1000000'});
          console.log(txResp)
          this.setState({txResp, ownerLoading: false, validOwnerAddress: true});
        }
        else {
          const txResp = await instance.methods.changeLockTime(values.time).send({from: this.props.token.info.metaMaskAccount, gas: '1000000'});
          console.log(txResp)
          this.setState({txResp, ownerLoading: false, validOwnerAddress: true});
        }

      }
    });
    // console.log(this.state.newOwnerAddress, "balanceAddress")
  }

  handleCheckAddress = (rule, value, callback) => {
    // console.log(rule, value, callback)
    this.setState({balanceAddress: value, txResp: '', addressValidateStatus: 'validating'})
    if (value) {
      if (value && !ethereum_address.isAddress(value)) {
        // console.log('invalid')
        this.setState({validOwnerAddress: false, addressValidateStatus: 'validating', addressHelp: 'Invalid Address!'});
        callback('Invalid Address!')
      }
      else {
        console.log('valid', value)
        this.setState({validOwnerAddress: true, addressValidateStatus: 'success', addressHelp: 'Valid Address'});
        callback()
      }
    }
    else {
      this.setState({validOwnerAddress: false, addressValidateStatus: '', addressHelp: ''});
      callback()
    }
  }
  handleAddressBlur = (evt) => {
    console.log(evt.target.value)
    if(evt.target.value == "") {
      this.setState({addressValidateStatus: '', addressHelp: ''});
    }
    else if(ethereum_address.isAddress(evt.target.value)) {
      this.setState({validOwnerAddress: true, addressValidateStatus: 'success', addressHelp: 'Valid Address'});
    }
    else {
      this.setState({validOwnerAddress: true, addressValidateStatus: '', addressHelp: 'Invalid Address'});
    }
  }

  confirm() {
    Modal.confirm({
      title: 'Confirm',
      content: 'Bla bla ...',
      okText: '确认',
      cancelText: '取消',
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card loading={this.props.loading} title={"Change " + this.props.componentAction}>
          {(this.props.token.info.metaMaskAccount == this.props.token.info.owner || this.props.componentAction == "Locktime") && <div>

            <Form style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }} onSubmit={this.props.componentAction == "Owner" ? this.getBalance : this.confirm.bind(this)} className="login-form">

              {
                this.props.componentAction == "Locktime" &&
                <Row>
                  <p><b>Current Date:</b> {this.state.currentDate}</p>
                </Row>
              }


              {this.props.componentAction == "Owner" &&
                <Row style={{width: '100%'}}>
                <Col span={24}  style={{width: '100%'}}>
                  <FormItem validateStatus={this.state.addressValidateStatus} hasFeedback help={this.state.addressHelp}>
                    {getFieldDecorator('address', {
                      rules: [{ required: true, message: 'Address is required!' },
                        {
                          validator: this.handleCheckAddress
                        }],
                    })(
                      <Input onBlur={this.handleAddressBlur} placeholder="Enter New Owner's Address" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              }

              <Row style={{ display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                <Col span={10} pull={8}>
                  {this.props.componentAction == "Locktime" && <FormItem validateStatus={this.state.addressValidateStatus} hasFeedback help={this.state.addressHelp}>
                    {getFieldDecorator('time', {
                      rules: [{ required: true, message: 'Time is required!' }],
                    })(
                      <Input min="1" type="number" placeholder="Enter New Lock Time" />
                    )}
                  </FormItem>}
                </Col>
                <Col span={6} pull={1}>
                  <FormItem>
                    <Button loading={this.state.ownerLoading}  type="primary" htmlType="submit" className="login-form-button">
                      Change {this.props.componentAction}
                    </Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>

            {this.state.validOwnerAddress && this.state.txResp.blockHash && this.state.newOwnerAddress &&
            <Row>
              <Col span={3}>
                <b>Address: </b>
              </Col>
              <Col span={3} style={{color: "#52c41a"}}>
                {this.state.newOwnerAddress}
              </Col>
            </Row>}
          </div>}


          {
            this.props.componentAction == "Locktime" &&
              <p>
                <Icon style={{color: '#FAAD14', marginRight: 10, fontSize: 17}} type="warning" />
                {(this.props.token.info.metaMaskAccount != this.props.token.info.owner && this.props.componentAction == "Owner") &&
                <span>Only an Onwer can change Owner Address. You should log through Owner address.</span>}

                {(this.props.componentAction == "Locktime") &&
                <span>This will change the Lock time of Current Meta Mask Account.</span>}

              </p>
          }
        </Card>

      </div>
    );
  }
}

ChangeOwner.propTypes = {

};

export default Form.create()(ChangeOwner);
