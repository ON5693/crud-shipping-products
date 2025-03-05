import  config from "../utils/config";
import { ProductDto, ShippingEstimate, ShippingInfo } from "./types";
import { GetDistanceBetweenCeps } from "cep-distance";

export const calculateShipping = async (product: ProductDto, info: ShippingInfo): Promise<ShippingEstimate> => {
    let estimatedDays = 0;
    const costPerKg = config.COST_PER_KG;
    const volumetricWeight = (product.dimensions.length * product.dimensions.width * product.dimensions.height) * 300;
    const shippingWeight = volumetricWeight > product.weight ? volumetricWeight : product.weight;
    const shippingCost = shippingWeight * costPerKg;
    
    const cepDistance = await GetDistanceBetweenCeps(info.from, info.to, "KM")
    const estimatedTime = Math.floor(Number(cepDistance) / 100);

    const costPerDistance = Number(cepDistance) * config.COST_PER_DISTANCE;
    if (estimatedTime < 24) {
      estimatedDays = 1;
    } else {
      estimatedDays = Math.floor(estimatedTime / 24) + 1;
    }
    return {
      cost: (shippingCost + costPerDistance).toFixed(2) + " BRL",
      estimatedDays: `${estimatedDays} days`,
    };
  }