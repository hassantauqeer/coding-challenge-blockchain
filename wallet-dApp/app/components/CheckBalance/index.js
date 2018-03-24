/**
*
* CheckBalance
*
*/

import React from 'react';
// import styled from 'styled-components';

import instance from '../../../token/saveToken';
import ethereum_address from 'ethereum-address';
import web3 from '../../../token/web3';
import { Row, Card, Col, Input, Button, Form, Icon } from "antd";
const FormItem = Form.Item;

class CheckBalance extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      balanceLoading: false,
      balance: '',
      validBalanceAddress: false,
      validSendingAddress: false,
      addressValidateStatus: "",
      addressHelp: "",
    }
  }
  getBalance = (e) => {
    this.setState({balanceLoading: true, validBalanceAddress: false})
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if(!values) {
        this.setState({validBalanceAddress: false, balanceLoading: false, addressValidateStatus: 'error', addressHelp: 'Address is required!'});
      }
      else if(err) {
        this.setState({validBalanceAddress: false, balanceLoading: false, addressValidateStatus: 'error', addressHelp: 'Invalid Address!'});
      }
      else {
        this.setState({validBalanceAddress: true});
        if(this.props.componentAction == "Balance") {
          const balance = await instance.methods.balanceOf(this.state.balanceAddress).call();
          this.setState({balance, balanceLoading: false, validBalanceAddress: true});
        }
        else {
          const balance = await instance.methods.lockTime(this.state.balanceAddress).call();
          this.setState({balance, balanceLoading: false, validBalanceAddress: true});
        }

      }
    });
    if (this.state.validSendingAddress) {
    }
    // console.log(this.state.balanceAddress, "balanceAddress")
  }

  handleCheckAddress = (rule, value, callback) => {
    // console.log(rule, value, callback)
    this.setState({balanceAddress: value, balance: '', addressValidateStatus: 'validating'})
    if (value) {
      if (value && !ethereum_address.isAddress(value)) {
        // console.log('invalid')
        this.setState({validBalanceAddress: false, addressValidateStatus: 'validating', addressHelp: 'Invalid Address!'});
        callback('Invalid Address!')
      }
      else {
        console.log('valid', value)
        this.setState({validBalanceAddress: true, addressValidateStatus: 'success', addressHelp: 'Valid Address'});
        callback()
      }
    }
    else {
      this.setState({validBalanceAddress: false, addressValidateStatus: '', addressHelp: ''});
      callback()
    }
  }
  handleAddressBlur = (evt) => {
    console.log(evt.target.value)
    if(evt.target.value == "") {
      this.setState({addressValidateStatus: '', addressHelp: ''});
    }
    else if(ethereum_address.isAddress(evt.target.value)) {
      this.setState({validBalanceAddress: true, addressValidateStatus: 'success', addressHelp: 'Valid Address'});
    }
    else {
      this.setState({validBalanceAddress: true, addressValidateStatus: '', addressHelp: 'Invalid Address'});
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card loading={this.props.loading} title={"Check " + this.props.componentAction}>
          <Form style={{ display: 'flex', justifyContent: 'space-between' }} onSubmit={this.getBalance} className="login-form">
            <FormItem validateStatus={this.state.addressValidateStatus} hasFeedback help={this.state.addressHelp} style={{ width: '70%'}}>
              {getFieldDecorator('address', {
                rules: [{ required: true, message: 'Address is required!' },
                  {
                    validator: this.handleCheckAddress
                  }],
              })(
                <Input onBlur={this.handleAddressBlur} placeholder="Enter Address" />
              )}
            </FormItem>
            <FormItem>
              <Button loading={this.state.balanceLoading}  type="primary" htmlType="submit" className="login-form-button">
                Check {this.props.componentAction}
              </Button>
            </FormItem>
          </Form>
          {this.state.validBalanceAddress && this.state.balance && this.state.balanceAddress &&
          <Row>
            <Col span={3}>
              <b>Address: </b>
            </Col>
            <Col span={3} style={{color: "#52c41a"}}>
              {this.state.balance} ST
            </Col>
          </Row>}
        </Card>
      </div>
    );
  }
}

CheckBalance.propTypes = {

};

export default Form.create()(CheckBalance);
