/*
 * bluetooth.h
 *
 *  Created on: Jun 9, 2024
 *      Author: choua
 */

#ifndef INC_BLUETOOTH_H_
#define INC_BLUETOOTH_H_

uint8_t MES_LEN, tx_buff[256], rx_buff[256], msg_end;
uint8_t TX_CPLT, RX_CPLT;
UART_HandleTypeDef *huart;


void BT_Config(UART_HandleTypeDef *_huart, uint8_t _message_len, uint8_t _msg_end)
{
	huart = _huart;
	MES_LEN = _message_len;
	msg_end = _msg_end;
}


uint8_t BT_Start_Receive()
{
	uint8_t tmp = 0;
	HAL_UART_Receive(huart, &tmp, 1, 100);
	if(tmp == msg_end)
	{
		HAL_UART_Receive_DMA(huart, rx_buff, MES_LEN);
		return 1;
	}
	return 0;
}

void BT_Transmit(uint8_t *_tx_buff)
{
	memcpy(tx_buff, _tx_buff, MES_LEN);
	HAL_UART_Transmit_DMA(huart, tx_buff, MES_LEN);
	TX_CPLT = 0;
}

void BT_Tx_Cplt()
{
	TX_CPLT = 1;
}

const uint8_t* BT_Rx_Cplt()
{
	HAL_UART_Receive_DMA(huart, rx_buff, MES_LEN);
	return rx_buff;
}

#endif /* INC_BLUETOOTH_H_ */
