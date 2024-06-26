/*
 * encoder.h
 *
 *  Created on: Jun 8, 2024
 *      Author: choua
 */

#ifndef INC_ENCODER_H_
#define INC_ENCODER_H_

typedef struct
{
	TIM_HandleTypeDef *htim;
	int8_t elapse;
}Encoder;

void Encoder_Start(Encoder* enc, TIM_HandleTypeDef *_htim)
{
	enc->htim = _htim;
	HAL_TIM_Base_Start_IT(enc->htim);
	HAL_TIM_Encoder_Start_IT(enc->htim, TIM_CHANNEL_ALL);
	enc->elapse = 0;
}

int16_t Encoder_getCnt(Encoder* enc)
{
	return (int16_t)__HAL_TIM_GET_COUNTER(enc->htim);
}

int8_t Encoder_getElapse(Encoder *enc)
{
	return enc->elapse;
}

void Encoder_retZero(Encoder* enc)
{
	enc->elapse = 0;
	__HAL_TIM_SET_COUNTER(enc->htim, 0);
}

void Encoder_elapseIT(Encoder* enc)
{
	if(__HAL_TIM_GET_COUNTER(enc->htim) == 0)
	{
		enc->elapse ++;
	}
	else
		enc->elapse --;
}

#endif /* INC_ENCODER_H_ */
