using System.Security.Cryptography;

using (var rsa = RSA.Create())
{
    Console.WriteLine("Private Key:");
    Console.WriteLine(rsa.ToXmlString(true));

    Console.WriteLine("Public Key:");
    Console.WriteLine(rsa.ToXmlString(false));
}
