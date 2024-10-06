import json

# Load the existing JSON data
with open('neo_data.json', 'r') as json_file:
    neos = json.load(json_file)

# Function to approximate coordinates (replace with actual logic if available)
def get_coordinates(neo):
    # Example logic to generate random coordinates for demonstration purposes
    import random
    lat = random.uniform(-90, 90)
    lon = random.uniform(-180, 180)
    return {'lat': lat, 'lon': lon}

# Update each NEO with new coordinates
for neo in neos:
    neo['coordinates'] = get_coordinates(neo)

# Save the updated JSON data
with open('neo_data.json', 'w') as json_file:
    json.dump(neos, json_file, indent=4)

print("Coordinates updated and saved to neo_data_updated.json")
