import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { saveSwagRequest } from '../../businessLogic/swag'
import { v4 as uuidv4 } from 'uuid'
import {SwagRequest} from "../../requests/SwagRequest";
import {sendEmail} from "../../businessLogic/email";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const personalInfo: SwagRequest = JSON.parse(event.body)
    const userId = uuidv4()

    const newRequest = {
      userId: userId,
      ...personalInfo
    }
    if(!('email' in personalInfo && 'name' in personalInfo)){
        return {
            statusCode: 400,
            body: "BadRequest, Please add a name & email to the payload"
        }
    }

    const delivery = getDeliveryDays();
    await saveSwagRequest(newRequest);
    await sendEmail(personalInfo.email, personalInfo.name, delivery)

    return {
      statusCode: 201,
      body: JSON.stringify({
        item: newRequest
      })
    }
  })

handler.use(
  cors({
    credentials: true
  })
)

const getDeliveryDays = (): number => {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date()
    const day = weekdays[today.getDay()];

    if(['Sunday', "Saturday"].includes(day)){
        return 4;
    }
    return 2;
}
