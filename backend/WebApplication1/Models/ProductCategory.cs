using System.Text.Json.Serialization;

namespace MsaBackend.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ProductCategory
    {
        PetFood = 0,
        PetSupply = 1,
        PetMedicne = 2,
    }
}
